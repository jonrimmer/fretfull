import React, { useMemo, ReactNode, useContext } from 'react';
import { tmap } from './util';
import './Fretboard.scss';
import Fret from './Fret';
import { Tuning, Note } from './music';
import NoteIndicator from './NoteIndicator';
import { SettingsContext } from './settings-context';
const headSize = 100;

export const positionToGridArea = 
  (string: number, fret: number) => `s${ string + 1 } / span 1 / s${string + 1} / f${ fret }`;

export const computeFretSizes = (fretCount: number): number[] => {
  const frets = [];
  let remainingSize = 10;

  for (let i = 0; i < fretCount; i++) {
    const size = remainingSize / 17.817;
    remainingSize = remainingSize - size;
    frets.push(size);
  }

  return frets;
}

export function gridColumns(frets: number[]): string {
  return '[start] auto [head] ' + headSize  + 'px ' + 
    tmap(frets, (size, i, { first, last }) =>
      (first ? '[nut f0] ' : '') +
      size + 'fr' +
      ' [f' + (i + 1) + (last ? ' fretboard-end]' : ']')
    ).join(' ') + ' auto [end]'
}

export function gridRows(tuning: Tuning): string {
  const l = tuning.notes.length;
  return '[top] auto ' +
    tmap(tuning.notes, (_note, i, { first }) =>
      (first ? '[top-edge ' : '[') + 's' + (l - i) + '] 40px'
    ).join(' ') + ' [bottom-edge s0]'
}

export interface Indicator {
  type: 'quiz' | 'indicator' | 'chordRoot';
  note: Note;
  gridArea: string;
}

interface Props {
  children?: ReactNode;
  fretCount: number;
  tuning: Tuning;
  notes: Indicator[];
}

export default function({children, fretCount, tuning, notes}: Props) {
  const [
    fretSizes,
    columns,
  ] = useMemo<[number[], string]>(() => {
    const frets = computeFretSizes(fretCount);

    return [
      frets,
      gridColumns(frets)
    ]
  }, [fretCount]);

  const { showOctave } = useContext(SettingsContext);

  const rows = useMemo(() => gridRows(tuning), [tuning]);

  return <div
    className="Fretboard"
    style={{
      gridTemplateColumns: columns,
      gridTemplateRows: rows
    }}
  >
    <div
      className="Fretboard-head"
      style={{
        gridArea: `top-edge / head / bottom-edge / nut`
      }}
    >
    </div>
    <div
      className="Fretboard-fingerboard"
      style={{
        gridArea: `top-edge / nut / bottom-edge / fretboard-end`
      }}
    ></div>

    { children }

    {
      notes.map((note, i) =>
        <NoteIndicator
          key={'note_' + i}
          showOctave={showOctave}
          {...note}
        ></NoteIndicator>
      )
    }

    {
      fretSizes.map((_size, i) =>
        <Fret
          key={'fret' + i}
          num={i}
        ></Fret>
      )
    }
  </div>
}
