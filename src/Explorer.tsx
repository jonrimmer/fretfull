import React, { useContext, ReactNode, useState, useMemo, useEffect } from 'react';
import { Indicator, positionToGridArea } from './Fretboard';
import { SettingsContext } from './settings-context';
import { Voicings } from './voicing';
import { majorChord, minorChord, addSemitones } from './music';

export default ({ content }: { content: (notes: Indicator[]) => ReactNode }) => {
  const { tuning, fretCount } = useContext(SettingsContext);
  const [chordRoot, setChordRoot] = useState('A');
  const [chordType, setChordType] = useState('Major');
  const voicings = useMemo(() => new Voicings(fretCount), []);
  const [voicingIndex, setVoicingIndex] = useState(0);
  const [notes, setNotes] = useState<Indicator[]>([]);

  useEffect(() => {
    const allNotes: Indicator[] = [];

    for (let string = 0; string < tuning.notes.length; string++) {
      for (let fret = 0; fret < fretCount + 1; fret++) {
        allNotes.push({
          type: 'indicator',
          note: tuning.positionToNote(string, fret),
          gridArea: positionToGridArea(string, fret)
        })
      }
    }

    setNotes(allNotes);
  }, [tuning, fretCount]);

  const showVoicing = (index: number) => {
    const chord = chordType == 'Major' ? majorChord(chordRoot + '3') : minorChord(chordRoot + '3');
    const chordVoicings = voicings.getVoicings(tuning, chord).root;

    if (index < 0) {
      index = 0;
    }
    else if (index >= chordVoicings.length) {
      index = chordVoicings.length - 1;
    }

    const played: Indicator[] = [];

    chordVoicings[index].notes.forEach((fret, string) => {
      if (fret !== null) {
        let note = addSemitones(tuning.notes[string], fret);

        played.push({
          type: note.tone === chord.rootNote.tone ? 'chordRoot' : 'indicator',
          note,
          gridArea: positionToGridArea(string, fret)
        });
      }
    });

    setNotes(played);
    setVoicingIndex(index);
  }

  const showChord = () => {
    showVoicing(0);
  };

  const nextVoicing = () => {
    showVoicing(voicingIndex + 1);
  }

  const prevVoicing = () => {
    showVoicing(voicingIndex - 1);
  }

  const firstVoicing = () => {
    showVoicing(Number.NEGATIVE_INFINITY);
  }

  const lastVoicing = () => {
    showVoicing(Number.POSITIVE_INFINITY);
  }

  return (
    <>
      { content(notes) }
      <div className="chordSelector">
        <select
          className="App-chord-root"
          value={chordRoot}
          onChange={event => setChordRoot(event.target.value)}
        >
          <option>A</option>
          <option>A#</option>
          <option>B</option>
          <option>C</option>
          <option>C#</option>
          <option>D</option>
          <option>D#</option>
          <option>E</option>
          <option>F</option>
          <option>F#</option>
          <option>G</option>
          <option>G#</option>
        </select>
        <select
          className="App-chord-type"
          value={chordType}
          onChange={event => setChordType(event.target.value)}
        >
          <option>Major</option>
          <option>Minor</option>
        </select>
        <button onClick={showChord}>Chord</button>
        <button onClick={firstVoicing}>|&lt;</button>
        <button onClick={prevVoicing}>&lt;</button>
        <button onClick={nextVoicing}>&gt;</button>
        <button onClick={lastVoicing}>&gt;|</button>
      </div>
    </>
  );
};
