const { input, testInput } = require("./input");
//// PART 1
let count = 0;
for (let i = 0; i < input.length; i++) {
    if (input[i - 1] < input[i]) {
        count++;
    }
}
console.log("🤿 Count Part 1:", count);

// reduce solution:
let countR = 0;
const countOfIncreases = (prev, curr) => {
    if (prev < curr) countR++;
    return curr;
};
input.reduce(countOfIncreases);
console.log("🤿 Count using reduce:", countR);

//// PART 2
// rolling window <----- look into this :D
let countTwo = 0;
// const inp = testInput;
const inp = input;
for (let i = 0; i < inp.length; i++) {
    const sum1 = inp[i] + inp[i + 1] + inp[i + 2];
    const sum2 = inp[i + 1] + inp[i + 2] + inp[i + 3];
    if (sum2 > sum1) {
        countTwo++;
    }
}
console.log("✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨✨");
console.log("🤿 🤿 Count Part Two:", countTwo);

// reduce solution attempt:
// toWindows solution altered from stackoverflow
const toWindows = (initialArr, rollingSize) => {
    return initialArr.reduce((acc, _, i, arr) => {
        if (i + rollingSize > arr.length) {
            //no more things to go over, return acc
            return acc;
        }
        return acc.concat(
            [arr.slice(i, i + rollingSize)] // array wrap needed...otherwise concat flattens stuff
        );
    }, []);
};
// toWindowsSum
const toWindowsSum = (initialArr, rollingSize) => {
    return initialArr.reduce((acc, _, i, arr) => {
        if (i + rollingSize > arr.length) {
            return acc;
        }
        return acc.concat([
            arr.slice(i, i + rollingSize).reduce((a, b) => a + b),
        ]);
    }, []);
};
countR = 0; // reset countR (work out how to scope that ;)...)
toWindowsSum(input, 3).reduce(countOfIncreases);
console.log("🤿 🤿  Reduce Count Part 2:", countR);
