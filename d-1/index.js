const { input, testInput } = require("./input");
let count = 0;
for (let i = 0; i < input.length; i++) {
    if (+input[i - 1] < +input[i]) {
        count++;
    }
}
console.log("count:", count);
// input.reduce(function (previousValue, currentValue, currentIndex, array) {
//     previousValue + currentValue;
// });
