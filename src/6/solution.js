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

    for (let sharedOrbits = 0; sharedOrbits < amountOfOrbitsForYou; ++sharedOrbits) {
        if (allOrbitsForYou[sharedOrbits] !== allOrbitsForSanta[sharedOrbits]) {
            return amountOfOrbitsForYou + amountOfOrbitsForSanta - sharedOrbits * 2 - 2;
        }
    }
};

module.exports = [solution1, solution2];
