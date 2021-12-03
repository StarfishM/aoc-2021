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

const createColArr = (arr) => {
    const colOfBits = [];
    arr.forEach((each) => {
        for (let i = 0; i < each.length; i++) {
            colOfBits[i] ? (colOfBits[i] += each[i]) : (colOfBits[i] = each[i]);
        }
    });
    return colOfBits;
};
const arrOfColVals = createColArr(testInput);
const part1Arr = arrOfColVals.map((each) => {
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

// PART 2
// upper function to find most occurence couldn't properly handle same amount...
const findLeastOccReg = (arr) => {
    if (!arr) return;
    const numOfOne = arr
        .sort((a, b) => a - b)
        .join("")
        .match(/[1*]/g)?.length;
    const numOfZero = arr
        .sort((a, b) => a - b)
        .join("")
        .match(/[0*]/g)?.length;
    return numOfZero <= numOfOne ? 0 : 1;
};

const findMostOccReg = (arr) => {
    if (!arr) return;
    const numOfOne = arr
        .sort((a, b) => a - b)
        .join("")
        .match(/[1*]/g)?.length;
    const numOfZero = arr
        .sort((a, b) => a - b)
        .join("")
        .match(/[0*]/g)?.length;
    return numOfOne >= numOfZero ? 1 : 0;
};

const createFilterO2 = (arr) => {
    const filterArr = [];
    arr.forEach((each) => {
        const colBits = each.split("");
        filterArr.push(findMostOccReg(colBits).toString());
    });
    return filterArr;
};
const createFilterCO2 = (arr) => {
    const filterArr = [];
    arr.forEach((each) => {
        const colBits = each.split("");
        filterArr.push(findLeastOccReg(colBits).toString());
    });
    return filterArr;
};
const o2Filter = createFilterO2(arrOfColVals);
const co2Filter = createFilterCO2(arrOfColVals);

const filterInputO2 = (arr, filterArr, i = 0) => {
    const filtered = arr.filter((each) => each[i] === filterArr[i]);
    let newFilterArr = [];
    newFilterArr = createFilterO2(createColArr(filtered));
    if (filtered.length === 1) {
        return filtered[0];
    } else {
        i++;
        return filterInputO2(filtered, newFilterArr, i);
    }
};
const filterInputCO2 = (arr, filterArr, i = 0) => {
    const filtered = arr.filter((each) => each[i] === filterArr[i]);
    let newFilterArr = [];
    newFilterArr = createFilterCO2(createColArr(filtered));
    if (filtered.length === 1) {
        return filtered[0];
    } else {
        i++;
        return filterInputCO2(filtered, newFilterArr, i);
    }
};
const o2 = parseInt(filterInputO2(input, o2Filter, 0), 2);
const co2 = parseInt(filterInputCO2(input, co2Filter, 0), 2);
console.log("------solution Part 2:", o2 * co2);
