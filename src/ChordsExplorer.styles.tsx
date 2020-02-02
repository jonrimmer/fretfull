import styled from 'styled-components';

export const ChordsExplorerContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1.2fr 1fr auto;
  grid-template-rows: auto 1fr;
  grid-gap: 12px;
  margin: 0 12px 12px 12px;

  .label {
    grid-row: 1;
    font-size: small;
    font-weight: bold;
  }

  .list {
    grid-row: 2;
  }

  .root {
    grid-area: 1;
  }

  .chord-type {
    grid-column: 2;
  }

  .bass-note {
    grid-column: 3;
  }

  .chord-notes {
    grid-column: 3;

    &.list {
      border: 1px solid #ccc;
      padding: 6px 10px;
      font-size: small;
      display: grid;
      grid-template-columns: auto auto auto auto auto;
      grid-auto-flow: row;
      align-content: start;
      grid-gap: 6px;
    }
  }

  .voicings {
    grid-column: 4;
  }

  .voicings-nav {
    grid-area: 2 / 5;
    display: flex;
    flex-direction: column;

    > button {
      flex: 1;
    }
  }
`;
