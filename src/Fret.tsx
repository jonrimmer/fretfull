import React, { ReactNode, FC } from 'react';
import './Fret.scss';

function dots(i: number): ReactNode {
  return i === 2 || i === 4 || i === 6 || i === 8 || i === 14 ? (
    <span className="dot single"></span>
  ) : i === 11 ? (
    <>
      <span className="dot double1"></span>
      <span className="dot double2"></span>
    </>
  ) : null;
}

interface FretProps {
  num: number;
}

const Fret: FC<FretProps> = ({ num }) => (
  <>
    <span
      className="Fret-number"
      style={{
        gridArea: `top / f${num}`,
      }}
    >
      {num + 1}
    </span>
    <div
      className="Fret"
      style={{
        gridArea: `top-edge / f${num} / bottom-edge / f${num + 1}`,
      }}
    >
      {dots(num)}
    </div>
  </>
);

export default Fret;
