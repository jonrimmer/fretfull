import { createVoicings } from './voicing';
import { parseSpn, Tuning, Chord } from './music';

describe('createVoicings', () => {
  const TUNING = new Tuning('Test', ['A1', 'A#1', 'B']);

  /*
    B1   C1   C#1
    A#1  B1   C1
    A1   A#1  B1
  */

  it('should return all voicings', () => {
    expect(createVoicings(TUNING, {
      notes: [
        'A1', 'B1', 'C1'
      ].map(parseSpn)
    } as Chord, 2)).toEqual({
      inversions: [],
      root: [
        {
          distance: 2,
          notes: [0, 1, 1],
          minFret: 0,
          maxFret: 1
        },
        {
          notes: [0, 2, 0],
          minFret: 0,
          maxFret: 2,
          distance: 2
        }
      ]
    });

    const v2 = createVoicings(TUNING, {
      notes: [
        'C1', 'B1'
      ].map(parseSpn)
    } as Chord, 2);

    expect(v2.root.length).toEqual(1);
    expect(v2.inversions.length).toEqual(4);
  });
});