import { useState, useMemo, Dispatch, SetStateAction } from 'react';

export function newBoolArray(len: number, val = true): boolean[] {
  const result = [];

  for (let i = 0; i  < len; i++) {
    result.push(val);
  }

  return result;
}

export function getRandomInt(max: number) {
  return Math.floor(Math.random() * Math.floor(max));
}

export function tmap<T>(
  arr: T[],
  callback: (item: T, index: number, props: { first: boolean, last: boolean, length: number}) => void
) {
  const l = arr.length;

  return arr.map((item, i) =>
    callback(item, i, {
      first: i === 0,
      last: i === (l - 1),
      length: l
    })
  );
}

export function isStringArray(value: any): value is string[] {
  if (value instanceof Array && (value.length === 0 || typeof value[0] === 'string')) {
    return true;
  }

  return false;
}

export function useDepState<S>(
  factory: (prevState?: S) => S,
  inputs: ReadonlyArray<any>,
): [S, Dispatch<SetStateAction<S>>] {
  let [state, setState] = useState<S>(factory());

  state = useMemo(() => {
    let newState = factory(state);

    if (newState !== state) {
      // We must only call if the new value is different, to avoid an infinite loop.
      setState(state = newState);
    }

    return state;
  }, [...inputs, state]);

  return [state, setState];
}
