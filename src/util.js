export function newBoolArray(len, val = true) {
  const result = [];

  for (let i = 0; i  < len; i++) {
    result.push(val);
  }

  return result;
}
