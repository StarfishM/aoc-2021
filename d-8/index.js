const { testInput, input } = require("./input.js");

const puzzleInput = input;

// PART 1
// only care about outputs
// check for specific length outputs to find 1 -> 2length, 4 -> 3 length, 7->2 length, 8 ->7 length
const allOutputs = [...puzzleInput.map((each) => each.outVal)]
    .filter(Boolean)
    .flat();
const find1478 = (arr) => {
    let countNums = 0;
    arr.forEach((outputSig) => {
        if (
            outputSig.length === 2 ||
            outputSig.length === 4 ||
            outputSig.length === 7 ||
            outputSig.length === 3
        )
            countNums++;
    });
    return countNums;
};
console.log("part 1:", find1478(allOutputs));

// PART 2
// set 1 -set 2 not the same as set 2 -set 1
