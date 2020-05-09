import React, { useMemo, ReactNode, FC } from 'react';
import { tmap } from './util';
import Fret from './Fret';
import NoteIndicator from './NoteIndicator';
import { Tuning, Note } from './music';
import {
  FretboardContainer,
  FretboardHead,
  Fingerboard,
} from './Fretboard.styles';
import { observer } from 'mobx-react-lite';
import { useSettings } from './rootStore';

const headSize = 100;

export const positionToGridArea = (string: number, fret: number) =>
  `s${string + 1} / span 1 / s${string + 1} / f${fret}`;

export const computeFretSizes = (fretCount: number): number[] => {
  const frets = [];
  let remainingSize = 10;

  for (let i = 0; i < fretCount; i++) {
    const size = remainingSize / 17.817;
    remainingSize = remainingSize - size;
    frets.push(size);
  }

  return frets;
};

export function gridColumns(frets: number[]): string {
  return (
    '[start] auto [head] ' +
    headSize +
    'px ' +
    tmap(
      frets,
      (size, i, { first, last }) =>
        (first ? '[nut f0] ' : '') +
        size +
        'fr' +
        ' [f' +
        (i + 1) +
        (last ? ' fretboard-end]' : ']')
    ).join(' ') +
    ' auto [end]'
  );
}

export function gridRows(tuning: Tuning): string {
  const l = tuning.notes.length;
  return (
    '[top] auto ' +
    tmap(
      tuning.notes,
      (_note, i, { first }) =>
        (first ? '[top-edge ' : '[') + 's' + (l - i) + '] 40px'
    ).join(' ') +
    ' [bottom-edge s0]'
  );
}

export interface Indicator {
  type: 'quiz' | 'indicator' | 'chordRoot';
  note: Note;
  gridArea: string;
}

interface FretboardProps {
  children?: ReactNode;
  fretCount: number;
  notes: Indicator[];
}

const Fretboard: FC<FretboardProps> = ({ children, fretCount, notes }) => {
  const settings = useSettings();

  const [fretSizes, columns] = useMemo<[number[], string]>(() => {
    const frets = computeFretSizes(fretCount);

    return [frets, gridColumns(frets)];
  }, [fretCount]);

  const rows = useMemo(() => gridRows(settings.tuning), [settings.tuning]);

  return (
    <FretboardContainer
      style={{
        gridTemplateColumns: columns,
        gridTemplateRows: rows,
      }}
    >
      <FretboardHead />
      <Fingerboard />

      {children}

      {notes.map((note, i) => (
        <NoteIndicator
          key={'note_' + i}
          showOctave={settings.showOctave}
          {...note}
        ></NoteIndicator>
      ))}

      {fretSizes.map((_size, i) => (
        <Fret key={'fret' + i} num={i}></Fret>
      ))}
    </FretboardContainer>
  );
};

export default observer(Fretboard);
