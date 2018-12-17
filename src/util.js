export function newBoolArray(len, val = true) {
  const result = [];

  for (let i = 0; i  < len; i++) {
    result.push(val);
  }

  return result;
}

export function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

export function tmap(arr, callback) {
  const l = arr.length;

  return arr.map((item, i) =>
    callback(item, i, {
      first: i === 0,
      last: i === (l - 1),
      length: l
    })
  );
}