import { Note, parseSpn, addSemitones, INTERVALS } from "./note";

interface ChordQuality {
  name: string;
  short: string;
  long: string;
}

export const CHORD_QUALITY: { [name: string]: ChordQuality } = {
  Major: {
    name: 'Major',
    short: '',
    long: 'maj'
  },
  Minor: {
    name: 'Minor',
    short: 'm',
    long: 'min'
  },
  Dominant: {
    name: 'Dominant',
    short: '',
    long: 'dom'
  },
  Augmented: {
    name: 'Augmented',
    short: '+',
    long: 'aug'
  },
  Diminished: {
    name: 'Diminished',
    short: 'o',
    long: 'dim'
  }
}

export class Chord {
  public notes: Note[];

  constructor(public quality: ChordQuality, rootNote: Note | string, intervals: number[]) {
    let root = rootNote = parseSpn(rootNote);
    this.notes = [
      root,
      ...intervals.map(i => addSemitones(root, i))
    ];
  }

  shortName(): string {
    return this.notes[0].tone + this.quality.short;
  }

  longName(): string {
    return this.notes[0].tone + this.quality.long;
  }

  get rootNote(): Note {
    return this.notes[0];
  }
}

export function majorTriad(rootNote: Note | string): Chord {
  return new Chord(CHORD_QUALITY.Major, rootNote, [INTERVALS.MajorThird, INTERVALS.PerfectFifth]);
}

export function minorChord(rootNote: Note | string): Chord {
  return new Chord(CHORD_QUALITY.Minor, rootNote, [INTERVALS.MinorThird, INTERVALS.PerfectFifth]);
}

export function majorSixth(rootNote: Note | string): Chord {
  return new Chord(
    CHORD_QUALITY.Major,
    rootNote,
    [INTERVALS.MajorThird, INTERVALS.PerfectFifth, INTERVALS.MajorSixth]
  );
}

export function dominantSeventh(rootNote: Note | string): Chord {
  return new Chord(
    CHORD_QUALITY.Dominant,
    rootNote,
    [INTERVALS.MajorThird, INTERVALS.PerfectFifth, INTERVALS.MinorSeventh]
  );
}

export function majorSeventh(rootNote: Note | string): Chord {
  return new Chord(
    CHORD_QUALITY.Major,
    rootNote,
    [INTERVALS.MajorThird, INTERVALS.PerfectFifth, INTERVALS.MajorSeventh]
  );
}
