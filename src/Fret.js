import React from 'react';
import './Fret.css';

function dots(i) {
  return (i === 2 || i === 4 || i === 6 || i === 8) ? 
    <span className="dot single"></span>
  : (i === 11) ? 
    <>
      <span className="dot double1"></span><span className="dot double2"></span
    ></>
  :
    null;
}

export default ({num}) =>
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
      { dots(num) }
    </div>
  </>;