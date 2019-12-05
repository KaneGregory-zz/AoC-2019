

const getOperations = (values, input) => {
  const getActualParamValue = (val, mode) => mode === 1 ? val : values[val];
  return {
    1: (a, b, outputIndex, modes) => { values[outputIndex] = getActualParamValue(a, modes[2]) + getActualParamValue(b, modes[1]); },
    2: (a, b, outputIndex, modes) => { values[outputIndex] = getActualParamValue(a, modes[2]) * getActualParamValue(b, modes[1]); },
    3: (outputIndex, modes) => { values[outputIndex] = input; },
    4: (a, modes) => { console.log(getActualParamValue(a, modes[0])); },
    5: (a, b, modes) => getActualParamValue(a, modes[1]) !== 0 ? getActualParamValue(b, modes[0]) : undefined,
    6: (a, b, modes) => getActualParamValue(a, modes[1]) === 0 ? getActualParamValue(b, modes[0]) : undefined,
    7: (a, b, outputIndex, modes) => { values[outputIndex] = getActualParamValue(a, modes[2]) < getActualParamValue(b, modes[1]) ? 1 : 0; },
    8: (a, b, outputIndex, modes) => { values[outputIndex] = getActualParamValue(a, modes[2]) === getActualParamValue(b, modes[1]) ? 1 : 0; },
  };
};

const intcode = (values, input) => {
  const v = values.slice();
  const OPERATIONS = getOperations(v, input);
  let pos = 0;
  while (v[pos] !== 99) {
    const opcodeParts = ('' + v[pos]).split('').map(n => Number.parseInt(n, 10));
    if (opcodeParts.length === 1) {
      opcodeParts.unshift(0);
    }
    const opTypeParts = opcodeParts.slice(-2);

    const opType = opTypeParts[0] * 10 + opTypeParts[1];
    const operation = OPERATIONS[opType];
    if (operation === undefined) {
      console.log(v[pos], opcodeParts, opTypeParts, opType);
      throw `invalid operation: ${opType}`;
    }
    const operationParamModes = opcodeParts.slice(0, opcodeParts.length - 2);
    const additionalOpParamModes = operation.length - 1 - operationParamModes.length;
    for (let i = 0; i < additionalOpParamModes; ++i) {
      operationParamModes.unshift(0);
    }
    const firstParam = pos + 1;
    const args = v.slice(firstParam, pos + operation.length);
    const nextPos = operation(...args, operationParamModes);

    pos = nextPos !== undefined ? nextPos : pos + operation.length;
  }
  return v[0];
};

module.exports = intcode;
