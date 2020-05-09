import styled, { keyframes } from 'styled-components';

export const QuizWrapper = styled.div``;

export const QuizQuestion = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const AnswerField = styled.input`
  width: 30vw;
  font-size: 24px;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
`;

const bgToGray = keyframes`
  to {
    background-color: lightgray;
  }
`;

export const Judgement = styled.div<{ correct: boolean }>`
  animation-name: ${bgToGray};
  animation-duration: 0.5s;
  animation-fill-mode: forwards;
  margin-top: 24px;
  padding: 16px;
  font-size: 24px;
  background-color: ${({ correct }) => (correct ? 'green' : 'red')};
`;
