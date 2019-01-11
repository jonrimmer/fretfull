import { tmap } from "./util";

describe('tmap', () => {
  it('should include first and last properties', () => {
    let called = 0;
    const result = tmap(['A', 'B', 'C'], (item, i, { first, last }) => {
      called++;

      if (i === 0) {
        expect(first).toBeTruthy();
      }
      else {
        expect(first).toBeFalsy();
      }
      
      if (i === 2) {
        expect(last).toBeTruthy();
      }
      else {
        expect(last).toBeFalsy();
      }

      return item + '_'
    });

    expect(called).toEqual(3);
    expect(result).toEqual(['A_', 'B_', 'C_']);
  });
});