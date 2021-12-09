const { testInput, input } = require("./input.js");

const puzzleInput = testInput;
const lowPoints = [];
for (let i = 0; i < puzzleInput.length; i++) {
    for (let j = 0; j < puzzleInput[i].length; j++) {
        // check which adjacent vals are defined
        const adjacents = [
            puzzleInput[i][j - 1],
            puzzleInput[i][j + 1],
            puzzleInput[i - 1] && puzzleInput[i - 1][j],
            puzzleInput[i + 1] && puzzleInput[i + 1][j],
        ].filter((each) => each != undefined);

        if (adjacents.every((num) => num > puzzleInput[i][j])) {
            lowPoints.push(puzzleInput[i][j]);
        }
    }
}

console.log("lowPoints:", lowPoints);
// part 1 sum of all lowPoints plus
let riskSum = 0;
lowPoints.forEach((each) => {
    each++;
    riskSum += each;
});
console.log("riskSum:", riskSum);

// PART 2 calculate basin
// change up array of lowpoints to include which array (y value), and which subindex they have(x value)

const lowPointsPlusXY = [];
for (let i = 0; i < puzzleInput.length; i++) {
    for (let j = 0; j < puzzleInput[i].length; j++) {
        // check which adjacent vals are defined
        const adjacents = [
            puzzleInput[i][j - 1],
            puzzleInput[i][j + 1],
            puzzleInput[i - 1] && puzzleInput[i - 1][j],
            puzzleInput[i + 1] && puzzleInput[i + 1][j],
        ].filter((each) => each != undefined);

        if (adjacents.every((num) => num > puzzleInput[i][j])) {
            lowPointsPlusXY.push({ lp: puzzleInput[i][j], y: i, x: j });
        }
    }
}
// go to lowPoint
// basin includes all adjascent -> take logic from above
// then:
// check if adjascent y+1 x+1 is the same number
// if not stop moving forward
// if yes add to basin and check next until you reach a num that's
// different
// check adjascent y-1 and x-1 is same num
// if not stop moving forward
// if yes add to basin and check next until you reach a num that's
// different
// check adjascent y+1 x-1
// check adjascent y-1 x+1
// when all four checks are through check next low point

// we care about basin with the largest three lengths, multiply them
// and you have the result
console.log(lowPointsPlusXY);
