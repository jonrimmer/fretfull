import { parseSpn, addSemitones, toneEquals, majorChord, minorChord, interval } from './music';

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