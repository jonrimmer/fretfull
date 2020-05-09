import React, { ReactNode, useState, SyntheticEvent, FC } from 'react';
import { Indicator, positionToGridArea } from './Fretboard';
import { getRandomInt } from './util';
import { toneEquals } from './music';
import {
  QuizQuestion,
  AnswerField,
  Judgement,
  QuizWrapper,
} from './Quiz.styles';
import { observer } from 'mobx-react-lite';
import { useSettings } from './rootStore';

interface Judgement {
  correct: boolean;
  id: number;
}

interface Question {
  type: string;
  string: number;
  fret: number;
}

const computeRandomQuestion = (
  includedStrings: boolean[],
  fretCount: number
): Question => {
  const strings = includedStrings.reduce<number[]>((acc, val, i) => {
    if (val) {
      acc.push(i);
    }

    return acc;
  }, []);

  return {
    type: 'note',
    string: strings[getRandomInt(strings.length)],
    fret: getRandomInt(fretCount),
  };
};

interface QuizProps {
  children: (notes: Indicator[]) => ReactNode;
  includedStrings: boolean[];
}

const Quiz: FC<QuizProps> = ({ children, includedStrings }) => {
  const settings = useSettings();
  const [answer, setAnswer] = useState('');
  const [judgement, setJudgement] = useState<Judgement | null>(null);
  const [question, setQuestion] = useState(() =>
    computeRandomQuestion(includedStrings, settings.fretCount)
  );

  const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    // Done late in case the tuning has changed.
    const solution = settings.tuning.positionToNote(
      question.string,
      question.fret
    );

    if (toneEquals(answer, solution.toString())) {
      setQuestion(computeRandomQuestion(includedStrings, settings.fretCount));

      setJudgement({
        correct: true,
        id: Date.now(),
      });
    } else {
      setJudgement({
        correct: false,
        id: Date.now(),
      });
    }

    setAnswer('');

    e.preventDefault();
  };

  if (!includedStrings[question.string]) {
    setQuestion(computeRandomQuestion(includedStrings, settings.fretCount));
  }

  const notes: Indicator[] = [
    {
      note: settings.tuning.positionToNote(question.string, question.fret),
      type: 'quiz',
      gridArea: positionToGridArea(question.string, question.fret),
    },
  ];

  return (
    <>
      {children(notes)}
      <QuizWrapper>
        <QuizQuestion onSubmit={(event) => handleSubmit(event)}>
          <h1>What is the higlighted note?</h1>
          <AnswerField
            type="text"
            value={answer}
            onChange={(event) => setAnswer(event.target.value)}
          />
          {judgement ? (
            <Judgement correct={judgement.correct} key={judgement.id}>
              {judgement.correct ? 'Correct' : 'Incorrect'}
            </Judgement>
          ) : null}
        </QuizQuestion>
      </QuizWrapper>
    </>
  );
};

export default observer(Quiz);
