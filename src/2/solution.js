const intcode = require("../intcode");

const solution1 = inputLines => {
    const values = inputLines[0].split(',').map(
        value => Number.parseInt(value, 10)
    );
    return intcode(values, 12, 2);
};

const solution2 = inputLines => {
    const TARGET = 19690720;

    let values = inputLines[0].split(',').map(
        value => Number.parseInt(value, 10)
    );
    for (let i = 0; i < 100; ++i) {
        for (let j = 0; j < 100; ++j) {
            try {
                if (intcode(values, i, j) === TARGET) {
                    return (i * 100) + j;
                }
            } catch (e) {
            }
        }
    }
    return "no solution found";
};

module.exports = [solution1, solution2];
