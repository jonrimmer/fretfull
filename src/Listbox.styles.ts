import styled from 'styled-components';

export const ListboxWrapper = styled.ul`
  overflow-y: auto;
  position: relative;
  padding: 0;
  border: 1px solid #ddd;
  background-color: #fff;
  font-size: 12px;
  margin: 0;
`;

export const ListboxOption = styled.li<{ selected: boolean }>`
  display: block;
  padding: 0.4em 1em 0.4em 1em;
  position: relative;
  line-height: 1.8em;

  background: ${({ selected }) => (selected ? `#bde4ff` : 'none')};
`;
