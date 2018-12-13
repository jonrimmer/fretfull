import React, { useState, useMemo } from 'react';
import Fret, { computeFrets} from './Fret';
import GuitarString, { computeStrings } from './GuitarString';
import { noteNames } from './const';
import './App.css';

const bridgeSize = 100;

const DEFAULT_TUNING = [
  7,  // E
  2,  // B
  10, // G
  5,  // D
  0,  // A
  7,  // E
];

const positionToNote = (string, fret) => {
  return noteNames[(string.rootNote + fret) % 12];
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

const computeRandomQuestion = (strings, frets) => {
  strings = strings.filter(s => s.includeInQuiz);
  const strNum = getRandomInt(strings.length);
  const string = strings[strNum];
  const fretNum = getRandomInt(frets.length);

  return {
    type: 'note',
    answer: positionToNote(string, fretNum),
    position: {
      string: string.num,
      fret: fretNum
    }
  };
}

const posToGrid = ({string, fret}) => (string + 1) + ' / ' + (fret + 1);

const App = () => {
  const frets = useMemo(() => computeFrets(12), []);
  const [tuning, setTuning] = useState(DEFAULT_TUNING);
  const [strings, setStrings] = useState(useMemo(() => computeStrings(tuning), [tuning]));
  const [showAllNotes, setShowAllNotes] = useState(true);
  const [judgement, setJudgement] = useState(null);

  const allFrettedNotes = useMemo(() => {
    const result = [];

    for (let s = 0; s < strings.length; s++) {
      for (let f = 0; f < frets.length + 1; f++) {
        result.push({
          position: {
            string: s,
            fret: f
          },
          name: positionToNote(strings[s], f)[0]
        })
      }
    }

    return result;
  }, [tuning]);

  const [answer, setAnswer] = useState('');
  const [question, setQuestion] = useState(() => 
    computeRandomQuestion(strings, frets)
  );

  const toggleShowAllNotes = (event) => {
    setShowAllNotes(event.target.checked);
  }

  const handleSubmit = event => {
    if (question.answer.some(value => value === answer)) {
      setQuestion(computeRandomQuestion(strings, frets));
      
      setJudgement({
        correct: true,
        id: Date.now()
      });
    }
    else {
      setJudgement({
        correct: false,
        id: Date.now()
      });
    }

    setAnswer('');

    event.preventDefault();
  };

  return (
    <div className="App">
      <header className="App-header">
        Guitar Quiz
        
        <label>
          <input
            type="checkbox"
            checked={showAllNotes}
            onChange={toggleShowAllNotes}
          />
          Show all notes
        </label>
      </header>
      <div
        className="App-fretboard"
        style={{
          gridTemplateColumns: `${ bridgeSize }px ${ frets.map(f => f.size + 'fr').join(' ') }`,
          gridTemplateRows: strings.map(() => '1fr').join(' ')
        }}
      >
        <div
          className="bridge"
          style={{
            gridArea: `1 / 1 / -1 / 2`
          }}
        >
        </div>

        <div
          className="note question-note"
          style={{
            gridArea: posToGrid(question.position)
          }}
        >?</div>

        {
          showAllNotes ? allFrettedNotes.map((note, i) =>
            <div
              key={i}
              className="note indicator-note"
              style={{
              gridArea: posToGrid(note.position)
              }}
            >
              { note.name }
            </div>
           ) : null
        }

        {
          frets.map((fret, i) =>
            <Fret key={i} {...fret}></Fret>
          )
        }
        
        {
          strings.map((str, i ) =>
            <>
              <GuitarString
                key={i}
                onToggle={() => {
                  let newStrings = strings.map(s => ({
                    ...s,
                    includeInQuiz: s == str ? !s.includeInQuiz : s.includeInQuiz
                  }));

                  setStrings(newStrings);
                  setQuestion(computeRandomQuestion(newStrings, frets));
                }}
                {...str}
              ></GuitarString>
            </>
          )
        }
      </div>

      <form className="App-question"
        onSubmit={event => handleSubmit(event)}
      >
        <h1>What is the higlighted note?</h1>
        <input
          className="App-answer-field"
          type="text"
          value={answer}
          onChange={event => setAnswer(event.target.value)}
        />
        {
          judgement ?
            <div
              className={'App-judgement ' + (judgement.correct ? 'correct' : 'incorrect') }
              key={judgement.id}
            >
              { judgement.correct ? 'Correct' : 'Incorrect' }
            </div> : null
        }
      </form>
    </div>
  );
}

export default App;
