import React from 'react';

const MAX_STRING_WIDTH = 3;

export const computeStrings = (tuning) => {
  const strings = [];

  for (let i = 0; i < tuning.notes.length; i++) {
    strings[i] = {
      rootNote: tuning.notes[i],
      num: i,
      width: Math.max(1, Math.round(((i + 1) / tuning.notes.length) * MAX_STRING_WIDTH))
    }
  }

  return strings;
}

export default ({includeInQuiz, rootNote, num, width, onToggle }) => {
  return <>
    <div
      key={ num }
      onClick={onToggle}
      className={'root-note ' + (includeInQuiz ? 'included' : 'excluded')}
      style={{
        gridArea: `${ num + 2 } / -1`
      }}
    >{ rootNote.letter }</div>
    <div
      className="string"
      style = {{
        height: '50%',
        gridArea: `${ num + 2 } / 1 / ${ num + 2 } / -1`,
        borderBottom: `${ width }px solid yellow`
      }}
    ></div>
  </>
}