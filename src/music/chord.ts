import { Note, parseSpn, addSemitones, INTERVALS as Intervals } from "./note";

interface ChordQuality {
  name: string;
  short: string;
  long: string;
}

export class Chord {
  public readonly notes: Note[];
  public readonly shortName: string;
  public readonly longName: string;

  constructor(rootNote: Note | string, intervals: number[]) {
    let root = rootNote = parseSpn(rootNote);
    this.notes = [
      root,
      ...intervals.map(i => addSemitones(root, i))
    ];

    const [third, fifth, seventh, ninth, ...added] = intervals;

    let shortName = root.tone;
    let longName = root.tone;

    // Naming logic as per:
    // https://en.wikipedia.org/wiki/Chord_names_and_symbols_(popular_music)

    switch(fifth) {
      case Intervals.PerfectFifth:
        switch(third) {
          case Intervals.MajorThird:
            switch(seventh) {
              case Intervals.MinorSeventh:
                shortName += 'm7';
                longName += 'min7';
                break;
              case Intervals.MajorSeventh:
            }
            break;
          case Intervals.MinorThird:
            shortName += 'm';
            longName += 'min';

            switch(seventh) {
              case Intervals.MinorSeventh:
                shortName += '7';
                longName += '7';
                break;
              case Intervals.MajorSeventh:
              shortName += '/m7';
              longName += '/maj7';
              break;
            }
            break;
        }
        break;
      case Intervals.Tritone:
        if (seventh) {
          switch(third) {
            case Intervals.MajorThird:
              switch(seventh) {
                case Intervals.MinorSeventh:
                  shortName += '7♭5';
                  longName += '7dim5';
                  break;
              }
              break;
            case Intervals.MinorThird:
              switch(seventh) {
                case Intervals.MinorSeventh:
                  shortName += 'ø7';
                  longName += 'ø7';
                  break;
                case Intervals.MajorSixth:
                  shortName += '°7';
                  longName += 'dim7';
                  break;
              }
              break;
          }
        }
        else {
          shortName += '°';
          longName += 'dim';
        }
        break;
      case Intervals.MinorSixth:
        shortName += '+';
        longName += 'aug';

        switch(seventh) {
          case Intervals.MinorSeventh:
            shortName += '7';
            longName += '7';
            break;
          case Intervals.MajorSeventh:
            shortName += '/m7';
            longName += '/maj7';
          break;
        }
        break;
    }

    this.shortName = shortName;
    this.longName = longName;
  }

  get rootNote(): Note {
    return this.notes[0];
  }
}

export function majorTriad(rootNote: Note | string): Chord {
  return new Chord(rootNote, [Intervals.MajorThird, Intervals.PerfectFifth]);
}

export function minorTriad(rootNote: Note | string): Chord {
  return new Chord(rootNote, [Intervals.MinorThird, Intervals.PerfectFifth]);
}

export function diminishedTriad(rootNote: Note | string): Chord {
  return new Chord(
    rootNote,
    [Intervals.MinorThird, Intervals.Tritone]
  )
}

export function majorSixth(rootNote: Note | string): Chord {
  return new Chord(
    rootNote,
    [Intervals.MajorThird, Intervals.PerfectFifth, Intervals.MajorSixth]
  );
}

export function dominantSeventh(rootNote: Note | string): Chord {
  return new Chord(
    rootNote,
    [Intervals.MajorThird, Intervals.PerfectFifth, Intervals.MinorSeventh]
  );
}

export function majorSeventh(rootNote: Note | string): Chord {
  return new Chord(
    rootNote,
    [Intervals.MajorThird, Intervals.PerfectFifth, Intervals.MajorSeventh]
  );
}

export function augmentedTriad(rootNote: Note | string): Chord {
  return new Chord(
    rootNote,
    [Intervals.MajorThird, Intervals.MinorSixth]
  );
}

export function augmentedSeventh(rootNote: Note | string): Chord {
  return new Chord(
    rootNote,
    [Intervals.MajorThird, Intervals.MinorSixth, Intervals.MinorSeventh]
  );
}

export function minorSixth(rootNote: Note | string): Chord {
  return new Chord(
    rootNote,
    [Intervals.MinorThird, Intervals.PerfectFifth, Intervals.MajorSixth]
  );
}

export function minorSeventh(rootNote: Note | string): Chord {
  return new Chord(
    rootNote,
    [Intervals.MinorThird, Intervals.PerfectFifth, Intervals.MinorSeventh]
  );
}

export function seventh(rootNote: Note | string): Chord {
  return new Chord(
    rootNote,
    [Intervals.MajorThird, Intervals.PerfectFifth, Intervals.MinorSeventh]
  )
}

export function minorMajorSeventh(rootNote: Note | string): Chord {
  return new Chord(
    rootNote,
    [Intervals.MinorThird, Intervals.PerfectFifth, Intervals.MajorSeventh]
  );
}

export function diminishedSeventh(rootNote: Note | string): Chord {
  return new Chord(
    rootNote,
    [Intervals.MinorThird, Intervals.Tritone, Intervals.MajorSixth]
  );
}

export function halfDiminishedSeventh(rootNote: Note | string): Chord {
  return new Chord(
    rootNote,
    [Intervals.MinorThird, Intervals.Tritone, Intervals.MinorSeventh]
  );
}
