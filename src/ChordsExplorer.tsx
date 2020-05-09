import React, { ReactNode, SyntheticEvent, FC } from 'react';
import { Indicator } from './Fretboard';
import Listbox from './Listbox';
import { RouteChildrenProps, useHistory } from 'react-router';
import { ChordsExplorerContainer } from './ChordsExplorer.styles';
import { ChordRoots, chordTypeKeys, ChordNoteStatus } from './chordsStore';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';
import { useChords } from './rootStore';

interface Params {
  chordRoot: string;
  chordType: string;
}

interface ChordsExporerProps extends RouteChildrenProps<Params> {
  children: (notes: Indicator[]) => ReactNode;
}

const ChordsExplorer: FC<ChordsExporerProps> = ({ children }) => {
  const chords = useChords();
  const history = useHistory();
  const { chordRoot, chordType } = useParams<Params>();

  let chordRootValue = decodeURIComponent(chordRoot);
  let chordTypeValue = decodeURIComponent(chordType);

  if (chordRootValue !== chords.chordRootValue) {
    chords.chordRootValue = chordRootValue;
  }

  if (chordTypeValue !== chords.chordType) {
    chords.chordType = chordTypeValue;
  }

  return (
    <>
      {children(chords.notes)}
      <ChordsExplorerContainer>
        <label className="root label">Root</label>
        <Listbox
          id="chordRoot"
          name="chordRoot"
          className="chord list"
          options={ChordRoots}
          value={chords.chordRoot}
          onSelect={(selected) =>
            history.push(
              `/chords/${encodeURIComponent(selected.value)}/${
                chords.chordType
              }`
            )
          }
        />

        <label className="chord-type label">Chord</label>
        <Listbox
          id="chordType"
          name="chordType"
          className="chord-type list"
          options={chordTypeKeys}
          value={chords.chordType}
          onSelect={(selected) =>
            history.push(
              `/chords/${encodeURIComponent(
                chords.chordRoot.value
              )}/${selected}`
            )
          }
        />

        <label className="chord-notes label">Notes</label>
        <div className="chord-notes list">
          {chords.chordNotes.map((n, i) => {
            const update = (e: SyntheticEvent<HTMLInputElement>) =>
              chords.updateChordNote(
                i,
                e.currentTarget.value as ChordNoteStatus
              );

            return (
              <React.Fragment key={i}>
                <span className="chord-note-label">{n.label}:</span>
                <label>
                  <input
                    type="radio"
                    value="Bass"
                    checked={n.status === 'Bass'}
                    onChange={update}
                  />{' '}
                  Bass
                </label>

                <label>
                  <input
                    type="radio"
                    value="Required"
                    checked={n.status === 'Required'}
                    onChange={update}
                  />{' '}
                  Required
                </label>

                <label>
                  <input
                    type="radio"
                    value="Optional"
                    checked={n.status === 'Optional'}
                    onChange={update}
                  />{' '}
                  Optional
                </label>

                <label>
                  <input
                    type="radio"
                    value="Omitted"
                    checked={n.status === 'Omitted'}
                    onChange={update}
                  />{' '}
                  Omitted
                </label>
              </React.Fragment>
            );
          })}
        </div>

        <label className="voicings label">
          {chords.chordVoicings.length} Voicings
        </label>
        <Listbox
          id="voicings"
          name="voicings"
          className="voicings list"
          options={chords.chordVoicings}
          value={chords.voicing}
          onSelect={(value) =>
            chords.showVoicing(chords.chordVoicings.indexOf(value))
          }
        />

        <div className="voicings-nav">
          <button onClick={() => chords.showVoicing(0)}>|&lt;</button>
          <button onClick={() => chords.showVoicing(chords.voicingIndex - 1)}>
            &lt;
          </button>
          <button onClick={() => chords.showVoicing(chords.voicingIndex + 1)}>
            &gt;
          </button>
          <button
            onClick={() => chords.showVoicing(chords.chordVoicings.length - 1)}
          >
            &gt;|
          </button>
        </div>
      </ChordsExplorerContainer>
    </>
  );
};

export default observer(ChordsExplorer);
