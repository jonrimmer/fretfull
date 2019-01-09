import { parseSpn, addSemitones, letterEquals, majorChord, minorChord, distanceForwards, interval } from './music';

describe('letterEquals', () => {
  it('should return true for identical letters and accidentals', () => {
    expect(letterEquals('A', 'A')).toBe(true);
    expect(letterEquals('B', 'B')).toBe(true);
    expect(letterEquals('G', 'G')).toBe(true);
    expect(letterEquals('A#', 'A#')).toBe(true);
    expect(letterEquals('Gb', 'Gb')).toBe(true);
  });

  it('should return false for non-indentical letters and accidentals', () => {
    expect(letterEquals('A', 'B')).toBe(false);
    expect(letterEquals('B', 'A')).toBe(false);
    expect(letterEquals('G', 'F')).toBe(false);
    expect(letterEquals('Bb', 'B#')).toBe(false);
    expect(letterEquals('G#', 'Fb')).toBe(false);
  });

  it('should return true for equivalent accidentals', () => {
    expect(letterEquals('A#', 'Bb')).toBe(true);
    expect(letterEquals('C#', 'Db')).toBe(true);
    expect(letterEquals('F#', 'Gb')).toBe(true);
  });
});

describe('parseSpn', () => {
  it('parses scientific note notation', () => {
    expect(parseSpn('A#4')).toEqual({
      tone: 'A#',
      octave: 4
    })
  });
});

describe('addSemitones', () => {
  const original = parseSpn('C4');

  it('should correctly modify the letter and octave', () => {
    expect(addSemitones(original, 13)).toEqual({
      tone: 'C#',
      octave: 5
    });
  })

  it('should handle negative values', () => {
    expect(addSemitones(original, -1)).toEqual({
      tone: 'B',
      octave: 3
    });
  })
});

describe('Chord', () => {
  it('should construct major chords correctly', () => {
    const c = majorChord('C3');
    expect(c.shortName()).toEqual('C');
    expect(c.longName()).toEqual('Cmaj');
    expect(c.notes.join('-')).toEqual('C-E-G');
  });

  it('should construct minor chords correctly', () => {
    const cmin = minorChord('C3');
    expect(cmin.shortName()).toEqual('Cm');
    expect(cmin.longName()).toEqual('Cmin');
    expect(cmin.notes.join('-')).toEqual('C-D#-G');
  });
});

describe('interval', () => {
  it('should return 0 for the same note', () =>{
    expect(interval(parseSpn('C3'), 'C')).toEqual(0);
  });

  it('should work for notes later in the octave', () => {
    expect(interval(parseSpn('C3'), 'F')).toEqual(5);
  })

  it('should work for notes earlier in the octave', () => {
    expect(interval(parseSpn('A3'), 'C')).toEqual(3);
  });
});