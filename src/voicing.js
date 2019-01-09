import { interval, addSemitones } from './music';

export class Voicings {
  tuningCache = new Map();

  constructor(fretCount = 12) {
    this.fretCount = fretCount;
  }

  getVoicings(tuning, chord) {
    let voicingsCache;
  
    if (this.tuningCache.has(tuning)) {
      voicingsCache = this.tuningCache.get(tuning);
    }
    else {
      this.tuningCache.set(tuning, voicingsCache = new Map());
    }
  
    let voicings;
  
    if (voicingsCache.has(chord)) {
      voicings = voicingsCache.get(chord);
    }
    else {
      voicingsCache.set(chord, voicings = createVoicings(tuning, chord, this.fretCount));
    }
  
    return voicings;
  }
}

class Voicing {
  constructor(notes) {
    const unmuted = notes.filter(n => n !== null);
    this.minFret = Math.min(...unmuted);
    this.maxFret = Math.max(...unmuted);
    this.distance = notes.reduce((a, b) => a + (b === null ? this.maxFret + 1 : b), 0);
    this.notes = notes;
  }
}

export function createVoicings(tuning, chord, fretCount) {
  const result = {
    root: [],
    inversions: []
  };

  function addCurrent(current) {
    const voicing = new Voicing(current);

    const bassNoteIndex = current.findIndex(n => n !== null);
    const bassNote = addSemitones(tuning.notes[bassNoteIndex], current[bassNoteIndex]);
    const inversion = bassNote.tone !== chord.notes[0].tone

    if (inversion) {
      result.inversions.push(voicing);
    }
    else {
      result.root.push(voicing);
    }
  }

  function buildVoicing(rootNotes, current, unplaced, placed) {
    if (rootNotes.length === 0) {
      if (unplaced.length === 0) {
        addCurrent(current);
      }

      return;
    }

    const [rootNote, ...remaining] = rootNotes;
    const unmuted = current.filter(n => n !== null);
    const min = Math.min(...unmuted);
    const max = Math.max(...unmuted);

    let possibilities = 0;

    for (let n = 0; n < unplaced.length; n++) {
      const start = interval(rootNote, unplaced[n]);
  
      for(let i = start; i < fretCount + 1; i += 12) {
        const newMin = Math.min(i, min);
        const newMax = Math.max(i, max);

        if (newMax - newMin > 4) {
          continue;
        }

        buildVoicing(
          remaining,
          [...current, i],
          unplaced.filter((_, i2) => i2 !== n),
          [...placed, unplaced[n]]
        );

        possibilities++;
      }
    }

    if (tuning.notes.length - current.length > unplaced.length) {
      // It's still possible to include repeated notes / mutes while placing all unplaced notes.

      for (let n = 0; n < placed.length; n++) {
        const start = interval(rootNote, placed[n]);
    
        for(let i = start; i < fretCount + 1; i += 12) {
          const newMin = Math.min(i, min);
          const newMax = Math.max(i, max);
  
          if (newMax - newMin > 4) {
            continue;
          }

          buildVoicing(
            remaining,
            [...current, i],
            unplaced,
            placed
          );

          possibilities++;
        }
      }

      // We only consider muting if we can't find any valid note to play,
      // or we haven't yet placed any note. This prevents adding lots of
      // silly variations where we're just unncessarily muting each string
      // in a given voicing.
      if (possibilities === 0 || placed.length === 0) {
        buildVoicing(
          remaining,
          [...current, null],
          unplaced,
          placed
        );
      }
    }
  }

  buildVoicing(
    tuning.notes,
    [],
    chord.notes,
    []
  );

  result.root.sort((a, b) => a.distance - b.distance);
  result.inversions.sort((a, b) => a.distance - b.distance);

  return result;
}