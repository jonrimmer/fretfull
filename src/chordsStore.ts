import { observable, computed, autorun, action, IObservableArray } from 'mobx';
import {
  Note,
  Chord,
  majorTriad,
  minorTriad,
  augmentedTriad,
  diminishedTriad,
  majorSixth,
  minorSixth,
  seventh,
  majorSeventh,
  minorSeventh,
  augmentedSeventh,
  diminishedSeventh,
  halfDiminishedSeventh,
  minorMajorSeventh,
  addSemitones,
} from './music';
import { createVoicings } from './voicing';
import { SettingsStore } from './settingsStore';
import { Indicator, positionToGridArea } from './Fretboard';

class ChordRoot {
  private label: string;

  constructor(public value: any, label?: string) {
    this.label = label || this.value.toString();
  }

  toString() {
    return this.label;
  }
}

export const ChordRoots = [
  new ChordRoot('A'),
  new ChordRoot('A#', 'A# / Db'),
  new ChordRoot('B'),
  new ChordRoot('C'),
  new ChordRoot('C#', 'C# / Db'),
  new ChordRoot('D'),
  new ChordRoot('D#', 'D# / Eb'),
  new ChordRoot('E'),
  new ChordRoot('F'),
  new ChordRoot('F#', 'F# / Gb'),
  new ChordRoot('G'),
  new ChordRoot('G#', 'G# / Ab'),
];

const chordTypes: { [key: string]: (note: Note | string) => Chord } = {
  'Major triad': majorTriad,
  'Minor triad': minorTriad,
  'Augmented triad': augmentedTriad,
  'Diminished triad': diminishedTriad,
  'Major 6th': majorSixth,
  'Minor 6th': minorSixth,
  '7th': seventh,
  'Major 7th': majorSeventh,
  'Minor 7th': minorSeventh,
  'Augmented 7th': augmentedSeventh,
  'Diminished 7th': diminishedSeventh,
  'Half-diminished 7th': halfDiminishedSeventh,
  'Minor-major 7th': minorMajorSeventh,
};

export const chordTypeKeys = Object.keys(chordTypes);

const ChordParts = ['Root', '3rd', '5th', '7th'];

export type ChordNoteStatus = 'Optional' | 'Required' | 'Omitted' | 'Bass';

interface ChordNote {
  note: Note;
  label: string;
  status: ChordNoteStatus;
}

class ChordsStore {
  constructor(private settings: SettingsStore) {
    autorun(() => {
      if (this.voicing !== null) {
        const voicing = this.voicing;
        let index = this.chordVoicings.findIndex((v) => v.equals(voicing));

        if (index === -1) {
          this.voicingIndex = index;
        }
      }
    });

    autorun(() => {
      const isSeventh = this.chord.notes.length > 3;

      this.chordNotes.replace(
        this.chord.notes.map<ChordNote>((note, i) => ({
          note,
          label: note.toString() + ' (' + ChordParts[i] + ')',
          status:
            i === 0 ? 'Bass' : i === 2 && isSeventh ? 'Optional' : 'Required',
        }))
      );
    });
  }

  @observable chordRootValue: string = 'A';
  @observable chordType: string = 'Major triad';
  @observable chordNotes: IObservableArray<ChordNote> = observable([]);

  @computed({ keepAlive: true }) get chordRoot() {
    return (
      ChordRoots.find((cr) => cr.value === this.chordRootValue) || ChordRoots[0]
    );
  }

  @computed({ keepAlive: true }) get chord() {
    return chordTypes[this.chordType](this.chordRoot.value + '3');
  }

  @computed({ keepAlive: true }) get chordVoicings() {
    let result = createVoicings(
      this.settings.tuning,
      this.chordNotes
        .filter((n) => n.status === 'Bass' || n.status === 'Required')
        .map((n) => n.note),
      this.chordNotes.filter((n) => n.status === 'Optional').map((n) => n.note),
      this.settings.fretCount
    );

    const bassNote = this.chordNotes.find((n) => n.status === 'Bass');

    if (bassNote) {
      result = result.filter((v) => v.bassNote.tone === bassNote.note.tone);
    }

    return result;
  }

  @observable voicingIndex: number = 0;

  @computed get voicing() {
    return this.chordVoicings[this.voicingIndex];
  }

  @computed({ keepAlive: true }) get notes() {
    const played: Indicator[] = [];

    this.voicing &&
      this.voicing.notes.forEach((fret, string) => {
        if (fret !== null) {
          let note = addSemitones(this.settings.tuning.notes[string], fret);

          played.push({
            type:
              note.tone === this.chord.rootNote.tone
                ? 'chordRoot'
                : 'indicator',
            note,
            gridArea: positionToGridArea(string, fret),
          });
        }
      });

    return played;
  }

  @action showVoicing(index: number) {
    if (index < 0) {
      index = 0;
    } else if (index >= this.chordVoicings.length) {
      index = this.chordVoicings.length - 1;
    }

    this.voicingIndex = index;
  }

  @action updateChordNote(index: number, status: ChordNoteStatus) {
    this.chordNotes[index].status = status;
  }
}

export default ChordsStore;
