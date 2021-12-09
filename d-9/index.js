const { testInput, input } = require("./input.js");

const puzzleInput = input;
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
