import React, { FC } from 'react';
import './Note.css';
import { Note } from './music';

const typeClass = {
  quiz: 'Note-quiz',
  indicator: 'Note-indicator',
  chordRoot: 'Note-chord-root',
};

interface NoteIndicatorProps {
  note: Note;
  type: keyof typeof typeClass;
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
    <div className={'Note ' + typeClass[type]} style={{ gridArea: gridArea }}>
      {label}
    </div>
  );
};

export default NoteIndicator;
