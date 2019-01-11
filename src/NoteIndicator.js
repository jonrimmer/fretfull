import React from 'react';
import './Note.css';

const typeClass = {
  quiz: 'Note-quiz',
  indicator: 'Note-indicator',
  chordRoot: 'Note-chord-root'
};

export default function({ note, type, showOctave, gridArea }) {
  let label;
  type = type || 'indicator';

  if (type === 'quiz') {
    label = '?'
  }
  else {
    label = <span>{ note.tone }{ showOctave ? <sub>{ note.octave }</sub>: null }</span>
  }

  return <div
    className={'Note ' + typeClass[type]}
    style={{gridArea: gridArea}}
  >
    { label }
  </div>
}
