const LETTER_TO_NUM = {
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

const NUM_TO_LETTER = [
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

export function letterEquals(a, b) {
  return LETTER_TO_NUM.hasOwnProperty(a) &&
    LETTER_TO_NUM.hasOwnProperty(b) &&
    LETTER_TO_NUM[a] === LETTER_TO_NUM[b];
}

export function parseSpn(spn) {
  if (spn.length === 3) {
    return {
      letter: spn[0] + spn[1],
      octave: parseInt(spn[2])
    };
  }

  return {
    letter: spn[0],
    octave: parseInt(spn[1])
  };
}

export function addSemitones(note, semitones) {
  const num = LETTER_TO_NUM[note.letter];

  let octave = note.octave;
  let letter = num + (semitones % 12);

  if (letter < 0) {
    letter += 12;
    octave--;
  }
  else if (letter >= 12) {
    letter -= 12;
    octave++;
  }

  octave += (semitones / 12) | 0;

  return {
    letter: NUM_TO_LETTER[letter],
    octave
  };
}

class Tuning {
  constructor(name, notes) {
    this.name = name;
    this.notes = notes.map(parseSpn);
  }
}

export const TUNINGS = [
  new Tuning('Standard', [
    'E2', 'A2', 'D3', 'G3', 'B3', 'E4'
  ]),
  new Tuning('Open A', [
    'E2', 'A2', 'C#3', 'E3', 'A3', 'E4'
  ]),
  new Tuning('Open B', [
    'B2', 'F#2', 'B3', 'F#3', 'B3', 'D#4'
  ]),
  new Tuning('Open C', [
    'C2', 'G2', 'C3', 'G3', 'C4', 'E4'
  ]),
  new Tuning('Open D', [
    'D2', 'A2', 'D3', 'F#3', 'A3', 'D4'
  ]),
  new Tuning('Open E', [
    'E2', 'B2', 'E3', 'G#3', 'B3', 'E4'
  ]),
  new Tuning('Open F', [
    'F2', 'A2', 'C3', 'F3', 'C4', 'F4'
  ]),
  new Tuning('Open F#', [
    'F#2', 'A#2', 'C#3', 'F#3', 'C#4', 'F#4'
  ]),
  new Tuning('Open G', [
    'D2', 'G2', 'D3', 'G3', 'B3', 'D4'
  ])
];
