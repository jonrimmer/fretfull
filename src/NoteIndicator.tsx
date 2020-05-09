import React, { FC } from 'react';
import { Note } from './music';
import { NoteIndicatorType } from './model';
import { NoteIndicatorWrapper } from './NoteIndicator.styles';

interface NoteIndicatorProps {
  note: Note;
  type: NoteIndicatorType;
  showOctave: boolean;
  gridArea: string;
}

const NoteIndicator: FC<NoteIndicatorProps> = ({
  note,
  type,
  showOctave,
  gridArea,
}) => {
  let label;
  type = type || 'indicator';

  if (type === 'quiz') {
    label = '?';
  } else {
    label = (
      <span>
        {note.tone}
        {showOctave ? <sub>{note.octave}</sub> : null}
      </span>
    );
  }

  return (
    <NoteIndicatorWrapper type={type} style={{ gridArea: gridArea }}>
      {label}
    </NoteIndicatorWrapper>
  );
};

export default NoteIndicator;
