import styled from 'styled-components';

export const AppContainer = styled.div`
  display: grid;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  grid-template-areas:
    'header'
    'fretboard'
    'content';
  grid-template-rows: auto auto 1fr;
  grid-template-columns: 1fr;
  grid-gap: 24px;

  .Explorer,
  .Quiz {
    grid-area: content;
    min-height: 0;
  }
`;

export const AppHeader = styled.header`
  display: grid;
  grid-area: header;
  grid-template: auto / auto 1fr auto;
  background: #f0f0f0;
  grid-column-gap: 16px;
  align-items: center;
  padding: 0 12px;
  border-bottom: 1px solid #ddd;
`;

export const AppTitle = styled.h1`
  grid-area: 1 / 1;
  font-size: inherit;
  align-self: center;
`;

export const AppNav = styled.nav`
  grid-area: 1 / 2;
  display: flex;

  a {
    padding: 12px;
    text-align: center;
    border-left: 1px solid #ccc;
    width: 100px;

    &:last-child {
      border-right: 1px solid #ccc;
    }

    &.active {
      background-color: #f8f8f8;
      font-weight: bold;
    }
  }
`;
