const getDigits = (number, length) => {
    const digits = [];
    for (let i = 0; i <= 5; ++i) {
        digits.push(getNthDigit(i, number));
    }
    return digits;
};

const getNthDigit = (ntn, number) => {
    const len = Math.floor( Math.log(number) / Math.LN10 ) - ntn;
    return ( (number / Math.pow(10, len)) % 10) | 0;
};

module.exports = getDigits;
