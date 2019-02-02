import React, { Fragment, useContext } from 'react';
import { Tuning } from './music';
import { SettingsContext } from './settings-context';
import './GuitarStrings.scss';

const MAX_STRING_WIDTH = 3;

export default (
  { activeStrings, onToggle}: { activeStrings: boolean[], onToggle: (num: number) => void}
) => {
  const { tuning } = useContext(SettingsContext);

  return <>{
    tuning.notes.map((rootNote, num, { length } ) => {
      const width = Math.max(1, Math.round(((length - (num + 1)) / length) * MAX_STRING_WIDTH));
      return (
        <Fragment key={num}>
          <div
            onClick={() => onToggle(num)}
            className={'GuitarStrings-root-note ' + (activeStrings[num] ? 'included' : 'excluded')}
            style={{
              gridArea: `s${ num + 1 } / fretboard-end`
            }}
          >{ rootNote.tone }</div>
          <div
            className="GuitarStrings-string"
            style = {{
              height: '50%',
              gridArea: `s${ num } / head / s${ num + 1 } / fretboard-end`,
              borderBottom: `${ width }px solid yellow`
            }}
          ></div>
        </Fragment>
      );
    })
  }</>
}
