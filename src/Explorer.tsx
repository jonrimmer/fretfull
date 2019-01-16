import React, { useContext, ReactNode, useState, useMemo, useEffect } from 'react';
import { Indicator, positionToGridArea } from './Fretboard';
import { SettingsContext } from './settings-context';
import { Voicings } from './voicing';
import { majorChord, minorChord, addSemitones } from './music';
import Listbox from './Listbox';
import './Explorer.scss';
import { RouteProps, RouteChildrenProps } from 'react-router';

interface Params { 
  chordRoot: string;
  chordType: string;
}

interface Props extends RouteChildrenProps<Params> {
  content: (notes: Indicator[]) => ReactNode;

}

export default ({ content, match, history }: Props) => {
  const { tuning, fretCount } = useContext(SettingsContext);
  // const [chordRoot, setChordRoot] = useState('A');
  // const [chordType, setChordType] = useState('Major');

  let { chordRoot, chordType } = match ? match.params : { chordRoot: 'A', chordType: 'Major' };

  chordRoot = decodeURIComponent(chordRoot);

  const voicings = useMemo(() => new Voicings(fretCount), []);
  let [voicingIndex, setVoicingIndex] = useState(0);

  const chord = useMemo(() => {
    return chordType == 'Major' ? majorChord(chordRoot + '3') : minorChord(chordRoot + '3');
  }, [chordRoot, chordType]);

  const chordVoicings = useMemo(() => {
    setVoicingIndex(voicingIndex = 0);
    return voicings.getVoicings(tuning, chord).root;
  }, [tuning, chord]);

  // useEffect(() => {
  //   const allNotes: Indicator[] = [];

  //   for (let string = 0; string < tuning.notes.length; string++) {
  //     for (let fret = 0; fret < fretCount + 1; fret++) {
  //       allNotes.push({
  //         type: 'indicator',
  //         note: tuning.positionToNote(string, fret),
  //         gridArea: positionToGridArea(string, fret)
  //       })
  //     }
  //   }

  //   setNotes(allNotes);
  // }, [tuning, fretCount]);

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

      <div className="Explorer">
        <label className="Explorer-chord-label">Root</label>
        <Listbox
          className="Explorer-chord"
          options={['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#']}
          value={chordRoot}
          onSelect={value => history.push(`/explore/${ encodeURIComponent(value) }/${ chordType }`)}
        />

        <label className="Explorer-chord-root-label">Chord</label>
        <Listbox
          className="Explorer-chord-root"
          options={['Major', 'Minor']}
          value={chordType}
          onSelect={value => history.push(`/explore/${ encodeURIComponent(chordRoot) }/${ value }`)}
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
