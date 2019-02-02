import { majorTriad, minorChord} from './chord';
import { interval, parseSpn } from './note';

describe('Chord', () => {
  it('should construct major chords correctly', () => {
    const c = majorTriad('C3');
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