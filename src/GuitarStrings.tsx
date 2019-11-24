import React, { Fragment, useContext, FC } from 'react';
import { SettingsContext } from './settings-context';
import './GuitarStrings.scss';

const MAX_STRING_WIDTH = 3;

interface GuitarStringProps {
  activeStrings: boolean[];
  onToggle: (num: number) => void;
}

const GuitarString: FC<GuitarStringProps> = ({ activeStrings, onToggle }) => {
  const { tuning } = useContext(SettingsContext);

  return (
    <>
      {tuning.notes.map((rootNote, num, { length }) => {
        const width = Math.max(
          1,
          Math.round(((length - (num + 1)) / length) * MAX_STRING_WIDTH)
        );
        return (
          <Fragment key={num}>
            <div
              onClick={() => onToggle(num)}
              className={
                'GuitarStrings-root-note ' +
                (activeStrings[num] ? 'included' : 'excluded')
              }
              style={{
                gridArea: `s${num + 1} / fretboard-end`,
              }}
            >
              {rootNote.tone}
            </div>
            <div
              className="GuitarStrings-string"
              style={{
                height: '50%',
                gridArea: `s${num} / head / s${num + 1} / fretboard-end`,
                borderBottom: `${width}px solid yellow`,
              }}
            ></div>
          </Fragment>
        );
      })}
    </>
  );
};

export default GuitarString;
