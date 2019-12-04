const getDigits = (number) => {
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

const solution1 = inputLines => {
    let current = 235741;
    const end = 706948;
    let possiblePasswords = 0;

    while (current <= end) {
        const digits = getDigits(current);
        let neverDescends = true;
        let hasDoubleDigits = false;
        for (let i = 0; i < digits.length - 1; ++i) {
            const currentDigit = digits[i];
            const nextDigit = digits[i + 1];
            if (currentDigit === nextDigit) {
                hasDoubleDigits = true;
            }
            if (neverDescends && currentDigit > nextDigit) {
                current += (currentDigit - nextDigit) * Math.pow(10, 4 - i);
                neverDescends = false;
            }
        }
        if (neverDescends && hasDoubleDigits) {
            possiblePasswords += 1;
        }
        if (neverDescends) {
            current += 1;
        }
    }
    return possiblePasswords;
};

const solution2 = inputLines => {
    let current = 235741;
    const end = 706948;
    let possiblePasswords = 0;

    while (current <= end) {
        const digits = getDigits(current);
        let neverDescends = true;
        let hasDoubleDigits = false;
        for (let i = 0; i < digits.length - 1; ++i) {
            const currentDigit = digits[i];
            const nextDigit = digits[i + 1];
            if (currentDigit === nextDigit && currentDigit !== digits[i - 1] && currentDigit !== digits[i + 2]) {
                hasDoubleDigits = true;
            }
            if (neverDescends && currentDigit > nextDigit) {
                current += (currentDigit - nextDigit) * Math.pow(10, 4 - i);
                neverDescends = false;
            }
        }
        if (neverDescends && hasDoubleDigits) {
            possiblePasswords += 1;
        }
        if (neverDescends) {
            current += 1;
        }
    }
    return possiblePasswords;
};

module.exports = [solution1, solution2];
