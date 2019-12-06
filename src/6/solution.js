const getSpaceObjectsFromInputLines = inputLines => {
    const orbitPairs = inputLines.map(orbit => orbit.split(')'));
    return orbitPairs.reduce((all, orbitPair) => {
        const center = orbitPair[0];
        const satellite = orbitPair[1];
        if (all[center] != null) {
            all[center].satellites.push(satellite);
        } else {
            all[center] = {
                center: undefined,
                satellites: [ satellite ],
            };
        }
        if (all[satellite] != null) {
            all[satellite].center = center;
        } else {
            all[satellite] = {
                center,
                satellites: [],
            };
        }
        return all;
    }, {});
};

const countOrbitsOfAllSatellites = (center, spaceObjects, level) =>
    spaceObjects[center].satellites.reduce((orbits, satellite) => orbits + level + countOrbitsOfAllSatellites(satellite, spaceObjects, level + 1), 0);

const solution1 = inputLines => {
    const spaceObjects = getSpaceObjectsFromInputLines(inputLines);

    return countOrbitsOfAllSatellites('COM', spaceObjects, 1);
};

const solution2 = inputLines => {
    const spaceObjects = getSpaceObjectsFromInputLines(inputLines);

    const getAllOrbitsFromCOMToObject = (satellite) => {
        let orbits = satellite === 'COM' ? [] : getAllOrbitsFromCOMToObject(spaceObjects[satellite].center);
        orbits.push(satellite);
        return orbits;
    };

    const allOrbitsForYou = getAllOrbitsFromCOMToObject('YOU');
    const allOrbitsForSanta = getAllOrbitsFromCOMToObject('SAN');
    const amountOfOrbitsForYou = allOrbitsForYou.length;
    const amountOfOrbitsForSanta = allOrbitsForSanta.length;

    let minimumPossibleFirstDivergence = 0;
    let maximumPossibleFirstDivergence = Math.min(amountOfOrbitsForYou, amountOfOrbitsForSanta);

    while(minimumPossibleFirstDivergence !== maximumPossibleFirstDivergence) {
        let currentOrbitToCheck = Math.floor((maximumPossibleFirstDivergence - minimumPossibleFirstDivergence) / 2 + minimumPossibleFirstDivergence);
        if (allOrbitsForYou[currentOrbitToCheck] === allOrbitsForSanta[currentOrbitToCheck]) {
            minimumPossibleFirstDivergence = currentOrbitToCheck + 1;
        } else {
            maximumPossibleFirstDivergence = currentOrbitToCheck;
        }
    }

    return amountOfOrbitsForYou + amountOfOrbitsForSanta - minimumPossibleFirstDivergence * 2 - 2;
};

module.exports = [solution1, solution2];
