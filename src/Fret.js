import React from 'react';
import './Fret.css';

export const computeFrets = (fretCount) => {
  const frets = [];
  let remainingSize = 10;

  for (let i = 0; i < fretCount; i++) {
    const size = remainingSize / 17.817;
    remainingSize = remainingSize - size;
  
    frets[i] = {
      size: size,
      num: i,
      dots: 0
    }
  
    if (i === 2 || i === 4 || i === 6 || i === 8) {
      frets[i].dots = 1;
    }
    else if (i === 11) {
      frets[i].dots = 2;
    }
  }

  return frets;
}

export default ({num, style, dots}) =>
  <>
    <span
      className="Fret-number"
      style={{
        gridArea: `top / f${num}`
      }}
    >
      { num + 1 }
    </span>
    <div
      className="Fret"
      style={{
        gridArea: `top-edge / f${num} / bottom-edge / f${num + 1}`
      }}
    >
      {
        dots === 1 ? <span className="dot single"></span> : null
      }
      {
        dots === 2 ? <>
          <span className="dot double1"></span><span className="dot double2"></span>
        </> : null
      }
    </div>
  </>;