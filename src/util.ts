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
