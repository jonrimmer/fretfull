import React from 'react';
import ReactDOM from 'react-dom';
import App, { gridColumns, gridRows } from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

describe('gridColumns', () => {
  it('should return the correct columns', () => {
    expect(gridColumns([{
      size: 3
    }, {
      size: 2
    }, {
      size: 1
    }])).toEqual(
      `[start] auto [head] 100px [nut f0] 3fr [f1] 2fr [f2] 1fr [f3 fretboard-end] auto [end]`
    )
  });
})

describe('gridRows', () => {
  it('should return the correct rows', () => {
    expect(gridRows({
      notes: [{
        letter: 'A'
      }, {
        letter: 'B'
      }, {
        letter: 'C'
      }]
    })).toEqual(
      `[top] auto [top-edge s3] 1fr [s2] 1fr [s1] 1fr [bottom-edge s0]`
    )
  });
});
