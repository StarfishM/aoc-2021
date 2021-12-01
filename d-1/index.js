const { input, testInput } = require("./input");
//// PART 1
let count = 0;
for (let i = 0; i < input.length; i++) {
    if (input[i - 1] < input[i]) {
        count++;
    }
}
console.log("count:", count);

// try with reduce
// still need to work some stuff out
const increaseCount = (prev, curr) => {
    if (prev < curr) countR++;
};
input.reduce(increaseCount, (countR = 0));
console.log("countR:", countR);

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
console.log("countTwo:", countTwo);
