const solution1 = inputLines => {
    const values = inputLines[0].split(',').map(
        value => Number.parseInt(value)
    );
    let pos = 0;
    console.log(values, pos);
    while (values[pos] !== 99) {
        console.log('beep');
        if (values[pos] === 1) {
            values[values[pos + 3]] = values[values[pos + 1]] + values[values[pos + 2]];
        } else if (values[pos] === 2) {
            values[values[pos + 3]] = values[values[pos + 1]] * values[values[pos + 2]];
        } else {
            throw "something went wrong";
        }
        pos += 4;
    }
    return values[0];
};

const solution2 = inputLines => {
};

module.exports = [solution1, solution2];
