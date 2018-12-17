import React, { useState, useMemo } from 'react';
import Fret, { computeFrets} from './Fret';
import GuitarString from './GuitarString';
import './App.css';
import { TUNINGS, addSemitones, letterEquals } from './music';
import { newBoolArray, getRandomInt, tmap } from './util';

const headSize = 100;
const MAX_STRING_WIDTH = 3;

const posToGrid = (string, fret) => `s${ string + 1 } / span 1 / s${string + 1} / f${ fret }`;

export function gridColumns(frets) {
  return '[start] auto [head] ' + headSize  + 'px ' + 
    tmap(frets, (f, i, { first, last }) =>
      (first ? '[nut f0] ' : '') +
      f.size + 'fr' +
      ' [f' + (i + 1) + (last ? ' fretboard-end]' : ']')
    ).join(' ') + ' auto [end]'
}

export function gridRows(tuning) {
  const l = tuning.notes.length;
  return '[top] auto ' +
    tmap(tuning.notes, (note, i, { first, last, length}) =>
      (first ? '[top-edge ' : '[') + 's' + (l - i) + '] 1fr'
    ).join(' ') + ' [bottom-edge s0]'
}

const App = () => {
  const frets = useMemo(() => computeFrets(12), []);
  const [appMode, setAppMode] = useState('explore');
  const [tuning, setTuning] = useState(TUNINGS[0]);
  const [judgement, setJudgement] = useState(null);
  const [answer, setAnswer] = useState('');
  const [includedStrings, setIncludedStrings] = useState(newBoolArray(tuning.notes.length));

  const computeRandomQuestion = (includedStrings) => ({
    type: 'note',
    string: getRandomInt(includedStrings.filter(incl => incl).length),
    fret: getRandomInt(frets.length)
  });

  const positionToNote = (string, fret) => {
    const rootNote = tuning.notes[tuning.notes.length - (string + 1)];
    return addSemitones(rootNote, fret).letter;
  }

  const [question, setQuestion] = useState(() => 
    computeRandomQuestion(includedStrings)
  );

  const allNotes = useMemo(() => {
    const result = [];

    for (let string = 0; string < tuning.notes.length; string++) {
      for (let fret = 0; fret < frets.length + 1; fret++) {
        result.push({
          cssClass: 'indicator',
          label: positionToNote(string, fret),
          gridArea: posToGrid(string, fret)
        })
      }
    }

    return result;
  }, [tuning]);

  let noteIndicators = [];

  if (appMode === 'quiz') {
    noteIndicators.push({
      label: '?',
      cssClass: 'question',
      gridArea: posToGrid(question.string, question.fret)
    })
  }
  else {
    noteIndicators = allNotes;
  }

  const handleSubmit = event => {

    if (letterEquals(question.answer, answer)) {
      setQuestion(computeRandomQuestion());
      
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

  const handleTuningChanged = (e) => {
    setTuning(TUNINGS.find(tuning => tuning.name === e.target.value) || tuning);
  }

  const toggleGuitarString = toToggle => {
    let value = [...includedStrings];
    value[toToggle] = !value[toToggle];
    setIncludedStrings(value);

    if (question.string.num === toToggle) {
      setQuestion(computeRandomQuestion(value));
    }
  };
  
  return (
    <div className="App">
      <header className="App-header">
        Guitar Quiz

        <div className="App-options">
          <label>
            <input
              type="radio"
              value="explore"
              checked={appMode === 'explore'}
              onChange={() => setAppMode('explore')}
            />
              Explore
          </label>
          <label>
            <input
              type="radio"
              value="quiz"
              checked={appMode === 'quiz'}
              onChange={() => setAppMode('quiz')}
            />
            Quiz
          </label>
        </div>

        <select
          value={tuning.name}
          onChange={handleTuningChanged}
        >
          { TUNINGS.map((tuning, i) => <option key={i}>{tuning.name}</option>)}
        </select>
        
      </header>
      <div
        className="App-fretboard"
        style={{
          gridTemplateColumns: gridColumns(frets),
          gridTemplateRows: gridRows(tuning)
        }}
      >
        <div
          className="head"
          style={{
            gridArea: `top-edge / head / bottom-edge / nut`
          }}
        >
        </div>
        <div
          className="fingerboard"
          style={{
            gridArea: `top-edge / nut / bottom-edge / fretboard-end`
          }}
        ></div>

        {
          noteIndicators.map(({gridArea, label, cssClass}, i) =>
            <div
              key={i}
              className={'note ' + cssClass}
              style={{ gridArea }}
            >
              { label }
            </div>
           )
        }

        {
          frets.map((fret, i) =>
            <Fret key={i} {...fret}></Fret>
          )
        }
        
        {
          tuning.notes.map((rootNote, i, { length } ) =>
            <GuitarString
              key={i}
              num={i}
              onToggle={() => toggleGuitarString(i)}
              includeInQuiz={includedStrings[i]}
              rootNote={rootNote}
              width={ Math.max(1, Math.round(((length - (i + 1)) / length) * MAX_STRING_WIDTH)) }
            ></GuitarString>
          )
        }
      </div>

      {
        appMode === 'quiz' ? <form 
          className="App-question"
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
      </form> : null
      }
    </div>
  );
}

export default App;
