import React, { useState, useMemo } from 'react';
import Fret, { computeFrets} from './Fret';
import GuitarString, { computeStrings } from './GuitarString';
import './App.css';
import { TUNINGS, addSemitones, letterEquals } from './music';
import { newBoolArray } from './util';

const bridgeSize = 100;

const positionToNote = (string, fret) => {
  return addSemitones(string.rootNote, fret).letter;
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

const posToGrid = (string, fret) => (string.num + 2) + ' / ' + (fret + 1);

const App = () => {
  const frets = useMemo(() => computeFrets(12), []);
  const [appMode, setAppMode] = useState('explore');
  const [tuning, setTuning] = useState(TUNINGS[0]);
  const [judgement, setJudgement] = useState(null);
  const [answer, setAnswer] = useState('');
  const [includedStrings, setIncludedStrings] = useState(newBoolArray(tuning.notes.length));

  const strings = useMemo(
    () => computeStrings(tuning, includedStrings),
    [tuning, includedStrings]
  );

  const computeRandomQuestion = (includedStrings) => {
    let validStrings = strings.filter((_s, i) => includedStrings[i]);
    const strNum = getRandomInt(validStrings.length);
    const string = validStrings[strNum];
    const fretNum = getRandomInt(frets.length);
  
    return {
      type: 'note',
      answer: positionToNote(string, fretNum),
      string,
      fret: fretNum
    };
  }

  const [question, setQuestion] = useState(() => 
    computeRandomQuestion(includedStrings)
  );

  const allNotes = useMemo(() => {
    const result = [];

    for (let string of strings) {
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
          gridTemplateColumns: `${ bridgeSize }px ${ frets.map(f => f.size + 'fr').join(' ') }`,
          gridTemplateRows: 'auto ' + strings.map(() => '1fr').join(' ') + ' auto'
        }}
      >
        <div
          className="bridge"
          style={{
            gridArea: `2 / 1 / -1 / 2`
          }}
        >
        </div>
        <div
          className="fingerboard"
          style={{
            gridArea: `2 / 2 / -1 / -1`
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
          strings.map((str, i ) =>
            <GuitarString
              key={i}
              onToggle={() => toggleGuitarString(i)}
              includeInQuiz={includedStrings[i]}
              {...str}
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
