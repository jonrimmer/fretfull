import React from 'react';

export default ({includeInQuiz, rootNote, num, width, onToggle }) => {
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