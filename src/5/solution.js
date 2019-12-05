const intcode = require("../intcode");

const solution1 = inputLines => {
    const values = inputLines[0].split(',').map(
        value => Number.parseInt(value, 10)
    );
    intcode(values, 1);
};

const solution2 = inputLines => {
    const values = inputLines[0].split(',').map(
        value => Number.parseInt(value, 10)
    );
    intcode(values, 5);
};

module.exports = [solution1, solution2];
