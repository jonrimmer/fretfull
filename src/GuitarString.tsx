import React, { MouseEventHandler } from 'react';
import { Note } from './music';

const MAX_STRING_WIDTH = 3;

interface Props {
  includeInQuiz: boolean;
  rootNote: Note;
  num: number;
  count: number;
  onToggle:  MouseEventHandler<HTMLDivElement>
}

export default ({includeInQuiz, rootNote, num, count, onToggle }: Props) => {
  const width = Math.max(1, Math.round(((count - (num + 1)) / count) * MAX_STRING_WIDTH));
  
  return <>
    <div
      key={ num }
      onClick={onToggle}
      className={'root-note ' + (includeInQuiz ? 'included' : 'excluded')}
      style={{
        gridArea: `s${ num + 1 } / fretboard-end`
      }}
    >{ rootNote.tone }</div>
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