// Lantern fish exponential growth
// Each day, a 0 becomes a 6 and adds a new 8 to the end of the list, while each other number decreases by 1 if it was present at the start of the day.

// In this example, after 18 days, there are a total of 26 fish. After 80 days, there would be a total of 5934.

// Find a way to simulate lanternfish. How many lanternfish would there be after 80 days?

// all nums count down
// 0 -> 6
// 8 gets added at the end for each iteration

const { testInput, input } = require("./input");

const puzzleInput = input;

// add initial population

function dayOfGrowth(amountOfDays, population) {
    const newPopulation = [...population];
    if (amountOfDays <= 0) {
        return newPopulation;
    }
    for (let i = 0; i < population.length; i++) {
        let fishTimer = newPopulation[i];
        fishTimer--;
        newPopulation[i] = fishTimer;
        if (newPopulation[i] === -1) {
            newPopulation.push(8);
            newPopulation[i] = 6;
        }
    }
    amountOfDays--;
    return dayOfGrowth(amountOfDays, newPopulation);
}

const grownPopulation = dayOfGrowth(80, puzzleInput);
console.log("grownPopulation.length", grownPopulation.length);

// need to come up with better calculation for part 2

const fishPopulation = {
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
    9: 0,
};
// console.log("fishPopulation:", fishPopulation);
// populate start population
puzzleInput.forEach((fish) => fishPopulation[fish]++);

const numOfDays = 256;
for (let i = 0; i < numOfDays; i++) {
    if (fishPopulation[0] > 0) {
        // if any fishies are at 0, reset their timer, and create a new one
        fishPopulation[7] += fishPopulation[0];
        fishPopulation[9] += fishPopulation[0];
    }
    for (const prop in fishPopulation) {
        if (fishPopulation[+prop + 1] !== undefined) {
            fishPopulation[prop] = fishPopulation[+prop + 1]; // set whatever used to be the number of fishies on day before to one day less
        } else {
            fishPopulation[9] = 0; // when newborn fishies have moved to 8 no values coming in from 10, meaning we need to reset 9 counter to 0
        }
    }
}

const countPopulation = (populationObj) => {
    let count = 0;
    for (let prop in populationObj) {
        count += populationObj[prop];
    }
    return count;
};
console.log("countPopulation PART 2:", countPopulation(fishPopulation));
