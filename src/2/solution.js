const intcode = require("../intcode");

const solution1 = inputLines => {
    const values = inputLines[0].split(',').map(
        value => Number.parseInt(value, 10)
    );
    values[1] = 12;
    values[2] = 2;
    return intcode(values);
};

const solution2 = inputLines => {
    const TARGET = 19690720;

    let values = inputLines[0].split(',').map(
        value => Number.parseInt(value, 10)
    );
    for (let i = 0; i < 100; ++i) {
        for (let j = 0; j < 100; ++j) {
            try {
                values[1] = i;
                values[2] = j;
                if (intcode(values) === TARGET) {
                    return (i * 100) + j;
                }
            } catch (e) {
            }
        }
    }
    return "no solution found";
};

module.exports = [solution1, solution2];
