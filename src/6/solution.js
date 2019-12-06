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

const isOrIsOrbitedBy = (center, satellite, spaceObjects) =>
    satellite != null && (satellite === center || isOrIsOrbitedBy(center, spaceObjects[satellite].center, spaceObjects));

const getDistanceToCenter = (center, satellite, spaceObjects) =>
    center === satellite ? 0 : 1 + getDistanceToCenter(center, spaceObjects[satellite].center, spaceObjects);

const solution2 = inputLines => {
    const spaceObjects = getSpaceObjectsFromInputLines(inputLines);
    let sharedCenter = 'YOU';

    while (!isOrIsOrbitedBy(sharedCenter, 'SAN', spaceObjects)) {
        sharedCenter = spaceObjects[sharedCenter].center;
    }

    return getDistanceToCenter(sharedCenter, spaceObjects['YOU'].center, spaceObjects)
        + getDistanceToCenter(sharedCenter, spaceObjects['SAN'].center, spaceObjects);
};

module.exports = [solution1, solution2];
