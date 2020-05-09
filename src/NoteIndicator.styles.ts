import styled, { css } from 'styled-components';
import { NoteIndicatorType } from './model';

export const NoteIndicatorWrapper = styled.div<{ type: NoteIndicatorType }>`
  z-index: 20;
  display: block;
  align-self: center;
  justify-self: center;
  border-radius: 8px;
  height: 30px;
  padding: 0 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;

  ${({ type }) => {
    switch (type) {
      case 'chordRoot': {
        return css`
          background-color: rgb(66, 201, 97);
        `;
      }
      case 'indicator': {
        return css`
          background-color: #75ced8;
        `;
      }
      case 'quiz': {
        return css`
          background-color: #00fdff;
          z-index: 30;
        `;
      }
    }
  }}
`;
