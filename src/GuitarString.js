import React from 'react';

const MAX_STRING_WIDTH = 3;

export default ({includeInQuiz, rootNote, num, count, onToggle }) => {
  const width = Math.max(1, Math.round(((count - (num + 1)) / count) * MAX_STRING_WIDTH));
  
  return <>
    <div
      key={ num }
      onClick={onToggle}
      className={'root-note ' + (includeInQuiz ? 'included' : 'excluded')}
      style={{
        gridArea: `s${ num + 1 } / fretboard-end`
      }}
    >{ rootNote.letter }</div>
    <div
      className="string"
      style = {{
        height: '50%',
        gridArea: `s${ num } / head / s${ num + 1 } / fretboard-end`,
        borderBottom: `${ width }px solid yellow`
      }}
    ></div>
  </>
}