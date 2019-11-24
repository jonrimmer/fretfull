import { interval, addSemitones, Tuning, Chord, Note } from './music';

export class Voicings {
  tuningCache = new Map<Tuning, Map<Chord, Voicing[]>>();

  constructor(public fretCount = 12) {}

  getVoicings(tuning: Tuning, chord: Chord): Voicing[] {
    let voicingsCache = this.tuningCache.get(tuning);

    if (!voicingsCache) {
      this.tuningCache.set(tuning, (voicingsCache = new Map()));
    }

    let voicings = voicingsCache.get(chord);

    if (!voicings) {
      voicingsCache.set(
        chord,
        (voicings = createVoicings(tuning, chord.notes, [], this.fretCount))
      );
    }

    return voicings;
  }
}

interface ChordVoicings {
  root: Voicing[];
  inversions: Voicing[];
}

type VoicingNotes = (number | null)[];

export class Voicing {
  minFret: number;
  maxFret: number;
  distance: number;
  private strValue: string;

  constructor(public notes: VoicingNotes, public bassNote: Note) {
    const unmuted = notes.filter(n => n !== null) as number[];
    this.minFret = Math.min(...unmuted);
    this.maxFret = Math.max(...unmuted);
    this.distance = notes.reduce<number>(
      (a, b) => a + (b === null ? this.maxFret + 1 : b),
      0
    );
    this.notes = notes;
    this.strValue = this.notes.map(n => (n === null ? 'x' : n)).join(' ');
  }

  toString() {
    return this.strValue;
  }

  equals({ notes }: Voicing) {
    if (this.notes.length !== notes.length) {
      return false;
    }

    return !this.notes.some((n1, i) => notes[i] !== n1);
  }
}

export function createVoicings(
  tuning: Tuning,
  required: Note[],
  optional: Note[] = [],
  fretCount: number
): Voicing[] {
  const result: Voicing[] = [];

  function addCurrent(current: VoicingNotes) {
    const bassNoteIndex = current.findIndex(n => n !== null) as number;
    const bassNote = addSemitones(
      tuning.notes[bassNoteIndex],
      current[bassNoteIndex] as number
    );
    const voicing = new Voicing(current, bassNote);

    result.push(voicing);
  }

  function buildVoicing(
    openNotes: Note[],
    current: (number | null)[],
    unplaced: Note[],
    placed: Note[]
  ) {
    if (openNotes.length === 0) {
      if (unplaced.length === 0) {
        addCurrent(current);
      }

      return;
    }

    const [openNote, ...remaining] = openNotes;
    const unmuted = current.filter(n => n !== null) as number[];
    const min = Math.min(...unmuted);
    const max = Math.max(...unmuted);

    let possibilities = 0;

    for (let n = 0; n < unplaced.length; n++) {
      const start = interval(openNote, unplaced[n].toString());

      for (let i = start; i < fretCount + 1; i += 12) {
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
      // It's still possible to include repeated and optional notes / mutes
      // while placing all unplaced required notes.

      [...placed, ...optional].forEach(n => {
        const start = interval(openNote, n.toString());

        for (let i = start; i < fretCount + 1; i += 12) {
          const newMin = Math.min(i, min);
          const newMax = Math.max(i, max);

          if (newMax - newMin > 4) {
            continue;
          }

          buildVoicing(remaining, [...current, i], unplaced, placed);

          possibilities++;
        }
      });

      // We only consider muting if we can't find any valid note to play,
      // or we haven't yet placed any note. This prevents adding lots of
      // silly variations where we're just unncessarily muting each string
      // in a given voicing.
      if (possibilities === 0 || placed.length === 0) {
        buildVoicing(remaining, [...current, null], unplaced, placed);
      }
    }
  }

  buildVoicing(tuning.notes, [], required, []);

  result.sort((a, b) => a.distance - b.distance);

  return result;
}
