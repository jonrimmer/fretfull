import { createVoicings } from './voicing';
import { parseSpn, Tuning } from './music';

describe('createVoicings', () => {
  const TUNING = new Tuning('Test', ['A1', 'B2', 'C#2']);

  it('should return all voicings', () => {
    expect(createVoicings(TUNING, {
      notes: [
        'B1', 'C1', 'D#1'
      ].map(parseSpn)
    }, 3)).toEqual([
      {
        distance: 5,
        inversion: false,
        notes: [2, 1, 2]
      }
    ]);

    const v2 = createVoicings(TUNING, {
      notes: [
        'C#1', 'B1'
      ].map(parseSpn)
    }, 3);

    console.log(v2);

    expect(v2.length).toEqual(5);
    expect(v2[0].distance).toEqual(0);
    expect(v2[4].distance).toEqual(4);
  });
});