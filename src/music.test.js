import { parseSpn, addSemitones } from './music';

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