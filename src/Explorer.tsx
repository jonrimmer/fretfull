import React, { useContext, ReactNode, useState, useMemo, useEffect } from 'react';
import { Indicator, positionToGridArea } from './Fretboard';
import { SettingsContext } from './settings-context';
import { Voicings } from './voicing';
import { majorChord, minorChord, addSemitones } from './music';
import Listbox from './Listbox';
import './Explorer.scss';
import { RouteChildrenProps } from 'react-router';

interface Params { 
  chordRoot: string;
  chordType: string;
}

interface Props extends RouteChildrenProps<Params> {
  content: (notes: Indicator[]) => ReactNode;
}

class ChordRoot {
  private label: string;

  constructor(public value: string, label?: string) {
    this.label = label || this.value;
  }

  toString() {
    return this.label;
  }
}

const ChordRoots = [
  new ChordRoot('A'),
  new ChordRoot('A#', 'A# / Db'),
  new ChordRoot('B'),
  new ChordRoot('C'),
  new ChordRoot('C#', 'C# / Db'),
  new ChordRoot('D'),
  new ChordRoot('D#', 'D# / Eb'),
  new ChordRoot('E'),
  new ChordRoot('F'),
  new ChordRoot('F#', 'F# / Gb'),
  new ChordRoot('G'),
  new ChordRoot('G#', 'G# / Ab')
];

export default ({ content, match, history }: Props) => {
  const { tuning, fretCount } = useContext(SettingsContext);

  let { chordRoot: crParam, chordType } = match ? match.params : { chordRoot: 'A', chordType: 'Major' };

  crParam = decodeURIComponent(crParam);

  const chordRoot = ChordRoots.find(cr => cr.value == crParam) || ChordRoots[0];

  const voicings = useMemo(() => new Voicings(fretCount), [fretCount]);
  let [voicingIndex, setVoicingIndex] = useState(0);

  const chord = useMemo(() => {
    return chordType == 'Major' ? majorChord(chordRoot + '3') : minorChord(chordRoot + '3');
  }, [chordRoot, chordType]);

  const chordVoicings = useMemo(() => {
    setVoicingIndex(voicingIndex = 0);
    return voicings.getVoicings(tuning, chord).root;
  }, [tuning, chord]);

  const voicing = chordVoicings[voicingIndex];

  const showVoicing = (index: number) => {
    if (index < 0) {
      index = 0;
    }
    else if (index >= chordVoicings.length) {
      index = chordVoicings.length - 1;
    }

    setVoicingIndex(index);
  }

  const notes = useMemo(() => {
    const played: Indicator[] = [];

    voicing.notes.forEach((fret, string) => {
      if (fret !== null) {
        let note = addSemitones(tuning.notes[string], fret);

        played.push({
          type: note.tone === chord.rootNote.tone ? 'chordRoot' : 'indicator',
          note,
          gridArea: positionToGridArea(string, fret)
        });
      }
    });

    return played;
  }, [voicing]);

  return (
    <>
      { content(notes) }

      <div className="Explorer">
        <label className="Explorer-chord-label">Root</label>
        <Listbox
          className="Explorer-chord"
          options={ChordRoots}
          value={chordRoot}
          onSelect={selected => history.push(`/explore/${ encodeURIComponent(selected.value) }/${ chordType }`)}
        />

        <label className="Explorer-chord-root-label">Chord</label>
        <Listbox
          className="Explorer-chord-root"
          options={['Major', 'Minor']}
          value={chordType}
          onSelect={selected => history.push(`/explore/${ encodeURIComponent(chordRoot.value) }/${ selected }`)}
        />

        <label className="Explorer-voicings-label">{ chordVoicings.length} voicings</label>

        <Listbox
          className="Explorer-voicings"
          options={chordVoicings}
          value={voicing}
          onSelect={value => setVoicingIndex(chordVoicings.indexOf(value))}
        />

        <div className="Explorer-voicings-nav">
          <button onClick={() => setVoicingIndex(0)}>|&lt;</button>
          <button onClick={() => showVoicing(voicingIndex - 1)}>&lt;</button>
          <button onClick={() => showVoicing(voicingIndex + 1)}>&gt;</button>
          <button onClick={() => showVoicing(chordVoicings.length - 1)}>&gt;|</button>
        </div>
      </div>
    </>
  );
};