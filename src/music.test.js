import { parseSpn, addSemitones, letterEquals } from './music';

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
      letter: 'A#',
      octave: 4
    })
  });
});

describe('addSemitones', () => {
  const original = parseSpn('C4');

  it('should correctly modify the letter and octave', () => {
    expect(addSemitones(original, 13)).toEqual({
      letter: 'C#',
      octave: 5
    });
  })

  it('should handle negative values', () => {
    expect(addSemitones(original, -1)).toEqual({
      letter: 'B',
      octave: 3
    });
  })
});