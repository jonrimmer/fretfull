import { parseSpn, addSemitones, toneEquals } from './note';

describe('letterEquals', () => {
  it('should return true for identical letters and accidentals', () => {
    expect(toneEquals('A', 'A')).toBe(true);
    expect(toneEquals('B', 'B')).toBe(true);
    expect(toneEquals('G', 'G')).toBe(true);
    expect(toneEquals('A#', 'A#')).toBe(true);
    expect(toneEquals('Gb', 'Gb')).toBe(true);
  });

  it('should return false for non-indentical letters and accidentals', () => {
    expect(toneEquals('A', 'B')).toBe(false);
    expect(toneEquals('B', 'A')).toBe(false);
    expect(toneEquals('G', 'F')).toBe(false);
    expect(toneEquals('Bb', 'B#')).toBe(false);
    expect(toneEquals('G#', 'Fb')).toBe(false);
  });

  it('should return true for equivalent accidentals', () => {
    expect(toneEquals('A#', 'Bb')).toBe(true);
    expect(toneEquals('C#', 'Db')).toBe(true);
    expect(toneEquals('F#', 'Gb')).toBe(true);
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
