import styled from 'styled-components';

export const GuitarString = styled.div`
  z-index: 10;
`;

export const RootNote = styled.div`
  padding: 0 6px 0 12px;
  align-self: center;

  &.excluded {
    color: #ccc;
  }
`;
