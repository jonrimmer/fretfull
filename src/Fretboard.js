import React from 'react';
import { tmap } from './util';
import './Fretboard.css';
import Fret from './Fret';

const headSize = 100;

export const posToGrid = (string, fret) => `s${ string + 1 } / span 1 / s${string + 1} / f${ fret }`;

export function gridColumns(frets) {
  return '[start] auto [head] ' + headSize  + 'px ' + 
    tmap(frets, (f, i, { first, last }) =>
      (first ? '[nut f0] ' : '') +
      f.size + 'fr' +
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

export default function({ children, frets, tuning}) {
  return <div
    className="Fretboard"
    style={{
      gridTemplateColumns: gridColumns(frets),
      gridTemplateRows: gridRows(tuning)
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
      frets.map((fret, i) =>
        <Fret key={i} {...fret}></Fret>
      )
    }
  </div>
}
