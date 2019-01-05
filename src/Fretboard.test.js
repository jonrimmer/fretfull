import { gridColumns, gridRows} from './Fretboard';

describe('gridColumns', () => {
  it('should return the correct columns', () => {
    expect(gridColumns([{
      size: 3
    }, {
      size: 2
    }, {
      size: 1
    }])).toEqual(
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