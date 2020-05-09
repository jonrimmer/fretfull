import React, { Fragment, FC } from 'react';
import { GuitarString, RootNote } from './GuitarStrings.styles';
import { observer } from 'mobx-react-lite';
import { useSettings } from './rootStore';

const MAX_STRING_WIDTH = 3;

interface GuitarStringProps {
  activeStrings: boolean[];
  onToggle: (num: number) => void;
}

export const GuitarStrings: FC<GuitarStringProps> = ({
  activeStrings,
  onToggle,
}) => {
  const settings = useSettings();

  return (
    <>
      {settings.tuning.notes.map((rootNote, num, { length }) => {
        const width = Math.max(
          1,
          Math.round(((length - (num + 1)) / length) * MAX_STRING_WIDTH)
        );
        return (
          <Fragment key={num}>
            <RootNote
              onClick={() => onToggle(num)}
              className={activeStrings[num] ? 'included' : 'excluded'}
              style={{
                gridArea: `s${num + 1} / fretboard-end`,
              }}
            >
              {rootNote.tone}
            </RootNote>
            <GuitarString
              style={{
                height: '50%',
                gridArea: `s${num} / head / s${num + 1} / fretboard-end`,
                borderBottom: `${width}px solid yellow`,
              }}
            ></GuitarString>
          </Fragment>
        );
      })}
    </>
  );
};

export default observer(GuitarStrings);
