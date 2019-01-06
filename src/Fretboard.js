import React, { useMemo } from 'react';
import { tmap } from './util';
import './Fretboard.css';
import Fret from './Fret';

const headSize = 100;

export const positionToGridArea = (string, fret) => `s${ string + 1 } / span 1 / s${string + 1} / f${ fret }`;

export const computeFretSizes = (fretCount) => {
  const frets = [];
  let remainingSize = 10;

  for (let i = 0; i < fretCount; i++) {
    const size = remainingSize / 17.817;
    remainingSize = remainingSize - size;
    frets.push(size);
  }

  return frets;
}

export function gridColumns(frets) {
  return '[start] auto [head] ' + headSize  + 'px ' + 
    tmap(frets, (size, i, { first, last }) =>
      (first ? '[nut f0] ' : '') +
      size + 'fr' +
      ' [f' + (i + 1) + (last ? ' fretboard-end]' : ']')
    ).join(' ') + ' auto [end]'
}

export function gridRows(tuning) {
  const l = tuning.notes.length;
  return '[top] auto ' +
    tmap(tuning.notes, (_note, i, { first }) =>
      (first ? '[top-edge ' : '[') + 's' + (l - i) + '] 40px'
    ).join(' ') + ' [bottom-edge s0]'
}

export default function({children, fretCount, tuning}) {
  const [
    fretSizes,
    columns,
  ] = useMemo(() => {
    const frets = computeFretSizes(fretCount);

    return [
      frets,
      gridColumns(frets)
    ]
  }, [fretCount]);

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
      fretSizes.map((size, i) =>
        <Fret
          key={i}
          size={size}
          num={i}
        ></Fret>
      )
    }
  </div>
}
