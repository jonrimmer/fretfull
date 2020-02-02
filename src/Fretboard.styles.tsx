import styled from 'styled-components';

export const FretboardContainer = styled.div`
  grid-area: fretboard;
  display: grid;
  margin: 0 12px;

  .fingerboard {
    background: linear-gradient(to bottom, #493b19 0%, #331d0c 100%);
  }

  .head {
    background-color: #222;
    border-right: 4px solid #ddd;
  }
`;
