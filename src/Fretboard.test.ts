import { gridColumns, gridRows, getOpenVoicing, getVoicings} from './Fretboard';
import { majorChord, TUNINGS } from './music';

describe('gridColumns', () => {
  it('should return the correct columns', () => {
    expect(gridColumns([3, 2, 1])).toEqual(
      `[start] auto [head] 100px [nut f0] 3fr [f1] 2fr [f2] 1fr [f3 fretboard-end] auto [end]`
    )
  });
})

describe('gridRows', () => {
  it('should return the correct rows', () => {
    expect(gridRows({
      notes: [{
        letter: 'A'
      }, {
        letter: 'B'
      }, {
        letter: 'C'
      }]
    })).toEqual(
      `[top] auto [top-edge s3] 40px [s2] 40px [s1] 40px [bottom-edge s0]`
    )
  });
});
