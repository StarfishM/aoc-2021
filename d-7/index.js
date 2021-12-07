/*
16,1,2,0,4,2,7,1,2,14
This means there's a crab with horizontal position 16, a crab with horizontal position 1, and so on.

Each change of 1 step in horizontal position of a single crab costs 1 fuel. You could choose any horizontal position to align them all on, but the one that costs the least fuel is horizontal position 2:

Move from 16 to 2: 14 fuel
Move from 1 to 2: 1 fuel
Move from 2 to 2: 0 fuel
Move from 0 to 2: 2 fuel
Move from 4 to 2: 2 fuel
Move from 2 to 2: 0 fuel
Move from 7 to 2: 5 fuel
Move from 1 to 2: 1 fuel
Move from 2 to 2: 0 fuel
Move from 14 to 2: 12 fuel
This costs a total of 37 fuel. This is the cheapest possible outcome; more expensive outcomes include aligning at position 1 (41 fuel), position 3 (39 fuel), or position 10 (71 fuel).

Determine the horizontal position that the crabs can align to using the least fuel possible. How much fuel must they spend to align to that position?
*/

const { testInput, input } = require("./input");

const puzzleInput = input;

// map over crabs, adjust everyone's position
// caculateTotalFuelCount
// check the fuel count
// once fuel count is higher than current midway through previous position was better
// if fuel count is lower still at the end, this is a lower fuel count
// const fuelCountReducer = (fuelCount, num, idx) => {
//     const targetPosition = idx;
//     fuelCount += num - targetPosition;
//     console.log("fuelCount:", fuelCount);
//     console.log("for Position:", idx);
//     return fuelCount;
// };

const calculateFuelCount = (arr, targetPosition) => {
    let totalFuelCount = 0;
    for (let i = 0; i < arr.length; i++) {
        totalFuelCount += Math.abs(arr[i] - targetPosition);
    }
    return totalFuelCount;
};

const checkAndCompareFuelCounts = (arr) => {
    let currTarget = 0;
    let lowestPossibleFuelCount = {};
    while (currTarget <= arr.length - 1) {
        const currFuelCount = calculateFuelCount(arr, currTarget);
        if (lowestPossibleFuelCount.fuelCount == undefined) {
            lowestPossibleFuelCount.fuelCount = currFuelCount;
            lowestPossibleFuelCount.position = currTarget;
        } else {
            if (lowestPossibleFuelCount.fuelCount > currFuelCount) {
                lowestPossibleFuelCount.fuelCount = currFuelCount;
                lowestPossibleFuelCount.position = currTarget;
            }
        }
        currTarget++;
    }
    return lowestPossibleFuelCount;
};
console.log(
    "lowest possible fuelCount PART 1:",
    checkAndCompareFuelCounts(puzzleInput)
);
