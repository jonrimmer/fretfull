import React, { ReactNode, useState, SyntheticEvent, useContext } from 'react';
import { Indicator, positionToGridArea } from './Fretboard';
import { getRandomInt } from './util';
import { SettingsContext } from './settings-context';
import { toneEquals } from './music';

interface Judgement {
  correct: boolean;
  id: number;
}

interface Question {
  type: string;
  string: number;
  fret: number;
}

const computeRandomQuestion = (includedStrings: boolean[], fretCount: number): Question => {
  const strings = includedStrings.reduce<number[]>((acc, val, i) => {
    if (val) {
      acc.push(i);
    }

    return acc;
  }, []);

  return {
    type: 'note',
    string: strings[getRandomInt(strings.length)],
    fret: getRandomInt(fretCount)
  };
};

interface Params {
  content: (notes: Indicator[]) => ReactNode;
  includedStrings: boolean[];
}

export default ({ content, includedStrings }: Params) => {
  const { fretCount, tuning } = useContext(SettingsContext);

  const [answer, setAnswer] = useState('');
  const [judgement, setJudgement] = useState<Judgement | null>(null);
  const [question, setQuestion] = useState(() => 
    computeRandomQuestion(includedStrings, fretCount)
  );

  const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    // Done late in case the tuning has changed.
    const solution = tuning.positionToNote(question.string, question.fret);

    if (toneEquals(answer, solution.toString())) {
      setQuestion(computeRandomQuestion(includedStrings, fretCount));
      
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

    e.preventDefault();
  };

  if (!includedStrings[question.string]) {
    setQuestion(computeRandomQuestion(includedStrings, fretCount));
  }

  const notes: Indicator[] = [{
    note: tuning.positionToNote(question.string, question.fret),
    type: 'quiz',
    gridArea: positionToGridArea(question.string, question.fret)
  }];

  return (
    <>
      { content(notes) }
      <div className="Quiz">
        <form 
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
        </form>
      </div>
    </>
  )
}
