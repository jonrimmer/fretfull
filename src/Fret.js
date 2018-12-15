import React from 'react';

export const computeFrets = (fretCount) => {
  const frets = [];
  let remainingSize = 200;

  for (let i = 0; i < fretCount; i++) {
    const size = remainingSize / 17.817;
    remainingSize = remainingSize - size;
  
    frets[i] = {
      size: size,
      num: i,
      style: {
        gridArea: `2 / ${ i + 2 } / -1 / ${ i + 2 }`
      },
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
      className="fret-number"
      style={{
        gridArea: `1 / ${ num + 2 }`
      }}
    >
      { num + 1 }
    </span>
    <div
      className="fret"
      style={ style }
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