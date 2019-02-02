export const LETTER_TO_NUM: {[tone: string]: number} = {
  'C': 0,
  'C#': 1,
  'Db': 1,
  'D': 2,
  'D#': 3,
  'Eb': 3,
  'E': 4,
  'F': 5,
  'F#': 6,
  'Gb': 6,
  'G': 7,
  'G#': 8,
  'Ab': 8,
  'A': 9,
  'A#': 10,
  'Bb': 10,
  'B': 11
};

export const NUM_TO_LETTER = [
  'C',
  'C#',
  'D',
  'D#',
  'E',
  'F',
  'F#',
  'G',
  'G#',
  'A',
  'A#',
  'B'
];


export enum INTERVALS {
  Unison = 0,
  MinorSecond = 1,
  MajorSecond = 2,
  MinorThird = 3,
  MajorThird = 4,
  PerfectFourth = 5,
  Tritone = 6,
  PerfectFifth = 7,
  MinorSixth = 8,
  MajorSixth = 9,
  MinorSeventh = 10,
  MajorSeventh = 11,
  Octave = 12
}

export class Note {
  constructor(public tone: string, public octave: number) {}

  toString(): string {
    return this.tone;
  }

  toSpn(): string {
    return this.tone + this.octave;
  }

  toneEquals(note: Note): boolean {
    return LETTER_TO_NUM[this.tone] === LETTER_TO_NUM[note.tone];
  }
}

export function toneEquals(a: string, b: string): boolean {
  return LETTER_TO_NUM.hasOwnProperty(a) &&
    LETTER_TO_NUM.hasOwnProperty(b) &&
    LETTER_TO_NUM[a] === LETTER_TO_NUM[b];
}

export function parseSpn(spn: string | Note): Note {
  if (typeof spn !== 'string') {
    // This lets us safely call parseSpn on things that might already be note objects.
    return spn;
  }

  if (spn.length === 3) {
    return new Note(spn[0] + spn[1], parseInt(spn[2]));
  }

  return new Note(spn[0], parseInt(spn[1]));
}

export function interval(note: Note, tone: string): number {
  let start = LETTER_TO_NUM[parseSpn(note).tone]; // 9
  let end = LETTER_TO_NUM[tone]; // 0

  let result = end - start;

  if (result < 0) {
    result += 12;
  }

  return result;
}

export function addSemitones(note: Note, semitones: number) {
  const num = LETTER_TO_NUM[note.tone];

  let octave = note.octave;
  let tone = num + (semitones % 12);

  if (tone < 0) {
    tone += 12;
    octave--;
  }
  else if (tone >= 12) {
    tone -= 12;
    octave++;
  }

  octave += (semitones / 12) | 0;

  return new Note(
    NUM_TO_LETTER[tone],
    octave
  );
}