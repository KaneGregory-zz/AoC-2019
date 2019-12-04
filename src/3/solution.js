const getNextLocation = (currentLocation, command) => {
    const nextLocation = {
        x: currentLocation.x,
        y: currentLocation.y,
    };
    switch (command.direction) {
        case "U":
            nextLocation.y = currentLocation.y + command.distance;
            break;
        case "D":
            nextLocation.y = currentLocation.y - command.distance;
            break;
        case "L":
            nextLocation.x = currentLocation.x - command.distance;
            break;
        case "R":
            nextLocation.x = currentLocation.x + command.distance;
            break;
    }
    return nextLocation;
};

const solution1 = inputLines => {
    const wires = inputLines.map(line => line.split(',').map(command => ({
        direction: command.charAt(0),
        distance: Number.parseInt(command.substring(1), 10)
    })));
    const wire1 = wires[0];
    const wire2 = wires[1];
    const wire1Parts = {
        horizontal: [],
        vertical: []
    };
    let currentLocation = {
        x: 0,
        y: 0,
    };

    for (let i = 0; i < wire1.length; ++i) {
        const command = wire1[i];
        const nextLocation = getNextLocation(currentLocation, command);

        switch (command.direction) {
            case "U":
            case "D":
                wire1Parts.vertical.push({
                    x: currentLocation.x,
                    yMin: Math.min(currentLocation.y, nextLocation.y),
                    yMax: Math.max(currentLocation.y, nextLocation.y),
                });
                break;
            case "L":
            case "R":
                wire1Parts.horizontal.push({
                    y: currentLocation.y,
                    xMin: Math.min(currentLocation.x, nextLocation.x),
                    xMax: Math.max(currentLocation.x, nextLocation.x),
                });
                break;
        }

        currentLocation = nextLocation;

    }

    currentLocation = {
        x: 0,
        y: 0,
    };

    let minDistance = Number.MAX_SAFE_INTEGER;

    for (let i = 0; i < wire2.length; ++i) {
        const command = wire2[i];
        const nextLocation = getNextLocation(currentLocation, command);

        if (command.direction === 'U' || command.direction === 'D') {
            const partMinY = Math.min(currentLocation.y, nextLocation.y);
            const partMaxY = Math.max(currentLocation.y, nextLocation.y);
            for (let j = 0; j < wire1Parts.horizontal.length; ++j) {
                const wire1Part = wire1Parts.horizontal[j];
                if (wire1Part.y >= partMinY && wire1Part.y <= partMaxY && wire1Part.xMin <= currentLocation.x && wire1Part.xMax >= currentLocation.x) {
                    const intersectionDistance = Math.abs(wire1Part.y) + Math.abs(currentLocation.x);
                    minDistance = Math.min(minDistance, intersectionDistance);
                }
            }
        } else {
            const partMinX = Math.min(currentLocation.x, nextLocation.x);
            const partMaxX = Math.max(currentLocation.x, nextLocation.x);
            for (let j = 0; j < wire1Parts.vertical.length; ++j) {
                const wire1Part = wire1Parts.horizontal[j];
                if (wire1Part.x >= partMinX && wire1Part.x <= partMaxX && wire1Part.yMin <= currentLocation.y && wire1Part.yMax >= currentLocation.y) {
                    const intersectionDistance = Math.abs(wire1Part.x) + Math.abs(currentLocation.y);
                    minDistance = Math.min(minDistance, intersectionDistance);
                }
            }
        }

        currentLocation = nextLocation;
    }
    return minDistance;
};

const solution2 = inputLines => {
    const wires = inputLines.map(line => line.split(',').map(command => ({
        direction: command.charAt(0),
        distance: Number.parseInt(command.substring(1), 10)
    })));
    const wire1 = wires[0];
    const wire2 = wires[1];
    const wire1Parts = {
        horizontal: [],
        vertical: []
    };
    let currentLocation = {
        x: 0,
        y: 0,
    };
    let steps = 0;

    for (let i = 0; i < wire1.length; ++i) {
        const command = wire1[i];
        const nextLocation = getNextLocation(currentLocation, command);

        switch (command.direction) {
            case "U":
            case "D":
                wire1Parts.vertical.push({
                    stepsAtStart: steps,
                    direction: command.direction,
                    x: currentLocation.x,
                    yMin: Math.min(currentLocation.y, nextLocation.y),
                    yMax: Math.max(currentLocation.y, nextLocation.y),
                });
                break;
            case "L":
            case "R":
                wire1Parts.horizontal.push({
                    stepsAtStart: steps,
                    direction: command.direction,
                    y: currentLocation.y,
                    xMin: Math.min(currentLocation.x, nextLocation.x),
                    xMax: Math.max(currentLocation.x, nextLocation.x),
                });
                break;
        }
        steps += command.distance;
        currentLocation = nextLocation;

    }

    currentLocation = {
        x: 0,
        y: 0,
    };

    let minSteps = Number.MAX_SAFE_INTEGER;
    steps = 0;

    for (let i = 0; i < wire2.length; ++i) {
        const command = wire2[i];
        const nextLocation = getNextLocation(currentLocation, command);

        if (command.direction === 'U' || command.direction === 'D') {
            const partMinY = Math.min(currentLocation.y, nextLocation.y);
            const partMaxY = Math.max(currentLocation.y, nextLocation.y);
            for (let j = 0; j < wire1Parts.horizontal.length; ++j) {
                const wire1Part = wire1Parts.horizontal[j];
                if (wire1Part.y >= partMinY && wire1Part.y <= partMaxY && wire1Part.xMin <= currentLocation.x && wire1Part.xMax >= currentLocation.x) {
                    const totalWire1Steps =
                        wire1Part.stepsAtStart + (wire1Part.direction === 'R' ? currentLocation.x - wire1Part.xMin : wire1Part.xMax - currentLocation.x);
                    const totalWire2Steps =
                        steps + (command.direction === 'U' ? wire1Part.y - partMinY : partMaxY - wire1Part.y);
                    minSteps = Math.min(minSteps, totalWire1Steps + totalWire2Steps);
                }
            }
        } else {
            const partMinX = Math.min(currentLocation.x, nextLocation.x);
            const partMaxX = Math.max(currentLocation.x, nextLocation.x);
            for (let j = 0; j < wire1Parts.vertical.length; ++j) {
                const wire1Part = wire1Parts.horizontal[j];
                if (wire1Part.x >= partMinX && wire1Part.x <= partMaxX && wire1Part.yMin <= currentLocation.y && wire1Part.yMax >= currentLocation.y) {
                    const totalWire1Steps =
                        wire1Part.stepsAtStart + (wire1Part.direction === 'U' ? currentLocation.y - wire1Part.yMin : wire1Part.yMax - currentLocation.y);
                    const totalWire2Steps =
                        steps + (command.direction === 'R' ? wire1Part.x - partMinX : partMaxX - wire1Part.x);
                    minSteps = Math.min(minSteps, totalWire1Steps + totalWire2Steps);
                }
            }
        }

        steps += command.distance;
        currentLocation = nextLocation;
    }
    return minSteps;
};

module.exports = [solution1, solution2];
