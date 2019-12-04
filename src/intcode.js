const getOperations = (values) => ({
  1: (a, b, output) => values[output] = values[a] + values[b],
  2: (a, b, output) => values[output] = values[a] * values[b]
});

const intcode = (values, noun, verb) => {
  const v = values.slice();
  const OPERATIONS = getOperations(v);
  let pos = 0;
  v[1] = noun;
  v[2] = verb;
  while (v[pos] !== 99) {
    const operation = OPERATIONS[v[pos]];
    if (operation === undefined) {
      throw `invalid operation: ${v[pos]}`;
    }
    const firstParam = pos + 1;
    pos += operation.length + 1;
    const args = v.slice(firstParam, pos);
    operation(...args);
  }
  return v[0];
};

module.exports = intcode;
