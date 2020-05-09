import styled from 'styled-components';

export const FretboardHead = styled.div`
  grid-area: top-edge / head / bottom-edge / nut;
`;

export const Fingerboard = styled.div`
  grid-area: top-edge / nut / bottom-edge / fretboard-end;
`;

export const FretboardContainer = styled.div`
  grid-area: fretboard;
  display: grid;
  margin: 0 12px;

  ${Fingerboard} {
    background: linear-gradient(to bottom, #493b19 0%, #331d0c 100%);
  }

  ${FretboardHead} {
    background-color: #222;
    border-right: 4px solid #ddd;
  }
`;
