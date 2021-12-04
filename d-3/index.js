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
// upper function to find most occurence couldn't properly handle same amount of 0s and 1s...
const matchNums = (str) => str.match(/(1*)(0*)/g);

const findMostOccReg = (arr) => {
    if (!arr) return;
    let [numOfZero, numOfOne] = matchNums(arr.sort((a, b) => a - b).join(""));
    numOfZero = numOfZero?.length;
    numOfOne = numOfOne?.length;
    return numOfOne >= numOfZero ? 1 : 0;
};
const findLeastOccReg = (arr) => {
    if (!arr) return;
    let [numOfZero, numOfOne] = matchNums(arr.sort((a, b) => a - b).join(""));

    numOfZero = numOfZero?.length;
    numOfOne = numOfOne?.length;
    return numOfZero <= numOfOne ? 0 : 1;
};

const filterMost = (arr) => {
    const filterArr = [];
    arr.forEach((each) => {
        const colBits = each.split("");
        filterArr.push(findMostOccReg(colBits).toString());
    });
    return filterArr;
};
const filterLeast = (arr) => {
    const filterArr = [];
    arr.forEach((each) => {
        const colBits = each.split("");
        filterArr.push(findLeastOccReg(colBits).toString());
    });
    return filterArr;
};
const o2Filter = filterMost(arrOfColVals);
const co2Filter = filterLeast(arrOfColVals);

const filterInputO2 = (arr, filterArr, i = 0) => {
    const filtered = arr.filter((each) => each[i] === filterArr[i]);
    let newFilterArr = [];
    newFilterArr = filterMost(createColArr(filtered));
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
    newFilterArr = filterLeast(createColArr(filtered));
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

// Thoughts for second approach:
// create array of objects, that keep track the col most occurence
// create a new array per col? of maybe have subarrays
