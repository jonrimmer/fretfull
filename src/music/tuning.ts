import { Note, parseSpn, addSemitones } from './note';

export class Tuning {
  notes: Note[];

  constructor(public name: string, notes: string[]) {
    this.notes = notes.map(parseSpn);
  }

  toString(): string {
    return this.notes.join('-');
  }

  positionToNote(string: number, fret: number) {
    const rootNote = this.notes[string];
    return addSemitones(rootNote, fret);
  }
}

export const TUNINGS = [
  new Tuning('Standard', ['E2', 'A2', 'D3', 'G3', 'B3', 'E4']),
  new Tuning('Open A', ['E2', 'A2', 'C#3', 'E3', 'A3', 'E4']),
  new Tuning('Open B', ['B2', 'F#2', 'B3', 'F#3', 'B3', 'D#4']),
  new Tuning('Open C', ['C2', 'G2', 'C3', 'G3', 'C4', 'E4']),
  new Tuning('Open D', ['D2', 'A2', 'D3', 'F#3', 'A3', 'D4']),
  new Tuning('Open E', ['E2', 'B2', 'E3', 'G#3', 'B3', 'E4']),
  new Tuning('Open F', ['F2', 'A2', 'C3', 'F3', 'C4', 'F4']),
  new Tuning('Open F#', ['F#2', 'A#2', 'C#3', 'F#3', 'C#4', 'F#4']),
  new Tuning('Open G', ['D2', 'G2', 'D3', 'G3', 'B3', 'D4']),
];
