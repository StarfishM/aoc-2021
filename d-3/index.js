/*
Considering only the first bit of each number, there are five 0 bits and seven 1 bits. Since the most common bit is 1, the first bit of the gamma rate is 1.

The most common second bit of the numbers in the diagnostic report is 0, so the second bit of the gamma rate is 0.

The most common value of the third, fourth, and fifth bits are 1, 1, and 0, respectively, and so the final three bits of the gamma rate are 110.

So, the gamma rate is the binary number 10110, or 22 in decimal.

The epsilon rate is calculated in a similar way; rather than use the most common bit, the least common bit from each position is used. So, the epsilon rate is 01001, or 9 in decimal. Multiplying the gamma rate (22) by the epsilon rate (9) produces the power consumption, 198.

Use the binary numbers in your diagnostic report to calculate the gamma rate and epsilon rate, then multiply them together. What is the power consumption of the submarine? (Be sure to represent your answer in decimal, not binary.)*/

const { testInput, input } = require("./input");

const findMostOccuring = (arr) => {
    return arr
        .sort(
            (a, b) =>
                arr.filter((v) => v === a).length -
                arr.filter((v) => v === b).length
        )
        .pop();
};

let gammaBin = [];
let epsilonBin = [];
let gammaArray = [];
input.forEach((each) => {
    for (let i = 0; i < each.length; i++) {
        gammaArray[i] ? (gammaArray[i] += each[i]) : (gammaArray[i] = each[i]);
    }
});

gammaArray.map((each) => {
    const gammaSplit = each.split("");
    const gammaVal = findMostOccuring(gammaSplit);
    gammaBin.push(gammaVal);
    gammaVal == 1 ? epsilonBin.push(0) : epsilonBin.push(1);
});

gammaBin = gammaBin.join("");
epsilonBin = epsilonBin.join("");

const gammaNum = parseInt(gammaBin, 2);
const epsilonNum = parseInt(epsilonBin, 2);
console.log("part 1 ------ ", gammaNum * epsilonNum);
