import React from 'react';
import { noteNames } from './const';

const MAX_STRING_WIDTH = 3;

export const computeStrings = (tuning) => {
  const strings = [];

  for (let i = 0; i < tuning.length; i++) {
    strings[i] = {
      rootNote: tuning[i],
      includeInQuiz: true,
      num: i,
      style: {
        gridArea: `${ i + 1 } / 1 / ${ i + 1 } / -1`,
        height: '50%',
        borderBottom: `${ Math.max(1, Math.round(((i + 1) / tuning.length) * MAX_STRING_WIDTH)) }px solid yellow`
      }
    }
  }

  return strings;
}

export default ({includeInQuiz, rootNote, num, style, onToggle }) => {
  return <>
    <div
      key={ num }
      onClick={onToggle}
      className={'note root-note ' + (includeInQuiz ? 'included' : 'excluded')}
      style={{
        gridArea: `${ num + 1 } / 1`
      }}
    >{ noteNames[rootNote][0] }</div>
    <div
      className="string"
      style = { style }
    ></div>
  </>
}