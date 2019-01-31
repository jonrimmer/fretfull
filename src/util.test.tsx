import { tmap, useDepState } from "./util";
import React from 'react'
import { render } from 'react-testing-library'

describe('tmap', () => {
  it('should include first and last properties', () => {
    let called = 0;
    const result = tmap(['A', 'B', 'C'], (item, i, { first, last }) => {
      called++;

      if (i === 0) {
        expect(first).toBeTruthy();
      }
      else {
        expect(first).toBeFalsy();
      }
      
      if (i === 2) {
        expect(last).toBeTruthy();
      }
      else {
        expect(last).toBeFalsy();
      }

      return item + '_'
    });

    expect(called).toEqual(3);
    expect(result).toEqual(['A_', 'B_', 'C_']);
  });
});

function EffectfulComponent({ options }: { options: string[] }) {
  const [value, setValue] = useDepState((prevState?: string) => {
    if (prevState && options.includes(prevState)) {
      return prevState;

      
    }
    else {
      return options[0];
    }
  }, [options]);
  return <>
    <span>{value}</span>
    <button onClick={() => setValue('C')}></button>
  </>
}

describe('useDepState', () => {
  const options = ['A', 'B', 'C'];
  const changedOptions = ['B', 'C'];

  const { container, rerender } = render(<EffectfulComponent options={options} />);
  const span = container.firstChild!;
  const btn = span.nextSibling! as HTMLButtonElement;

  it('should render the default option', () => {
    expect(span.textContent).toBe('A');
  });

  it('should reset when the dependencies change', () => {
    rerender(<EffectfulComponent options={changedOptions} />);
    expect(span.textContent).toBe('B');
  });

  it('should retain valid values when dependencies change', () => {
    rerender(<EffectfulComponent options={options} />);
    expect(span.textContent).toBe('B');
    btn.click();
    expect(span.textContent).toBe('C');
    rerender(<EffectfulComponent options={changedOptions} />);
    expect(span.textContent).toBe('C');
  });
});