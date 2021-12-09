const { testInput, input } = require("./input.js");

const puzzleInput = input;

// PART 1
// only care about outputs
const allOutputs = [...puzzleInput.map((each) => each.outVal)].flat();

const is1 = (str) => str.length === 2;
const is4 = (str) => str.length === 4;
const is7 = (str) => str.length === 3;
const is8 = (str) => str.length === 7;

const find1478 = (arr) => {
    let countNums = 0;
    arr.forEach((outputSig) => {
        if (
            outputSig.length === 2 || // is one
            outputSig.length === 4 || // is four
            outputSig.length === 7 || // is eight
            outputSig.length === 3 // is seven
        )
            countNums++;
    });
    return countNums;
};
console.log("part 1:", find1478(allOutputs));

// PART 2
/*acedgfb: 8
cdfbe: 5
gcdfa: 2
fbcad: 3
dab: 7
cefabd: 9
cdfgeb: 6
eafb: 4
cagedb: 0
ab: 1
Then, the four digits of the output value can be decoded:

cdfeb: 5
fcadb: 3
cdfeb: 5
cdbaf: 3
Therefore, the output value for this entry is 5353.

Following this same process for each entry in the second, larger example above, the output value of each entry can be determined:

fdgacbe cefdb cefbgd gcbe: 8394
fcgedb cgb dgebacf gc: 9781
cg cg fdcagb cbg: 1197
efabcd cedba gadfec cb: 9361
gecf egdcabf bgf bfgea: 4873
gebdcfa ecba ca fadegcb: 8418
cefg dcbef fcge gbcadfe: 4548
ed bcgafe cdgba cbgef: 1625
gbdfcae bgc cg cgb: 8717
fgae cfgab fg bagce: 4315 */

const decode325 = (arrUsp, dict) => {
    // 3 contains all of 1
    // 5 is contained in 6 2 is not
    // whatever is left has to be 2
    const decoded325 = arrUsp.map((sig) => {
        if (sig.length != 5) return;
        const sequenceToCheck = sig.split("");
        if (containsAllVals(sequenceToCheck, dict[1])) {
            return { 3: sequenceToCheck };
        } else if (containsAllVals(dict[6], sequenceToCheck)) {
            return { 5: sequenceToCheck };
        } else {
            return { 2: sequenceToCheck };
        }
    });
    return decoded325.filter(Boolean);
};

const decode906 = (arrUsp, dict) => {
    // 8 includes all of 9 and 9 includes all of 4
    // 8 includes all of 0 and 0 does not inclues all of 4
    // 8 includes all of 6 and
    // all of 4 is in 9 and 6, all of but not in 0
    // all of 3 is in 9 but not in 6
    const decoded906 = arrUsp.map((sig) => {
        if (sig.length != 6) return;
        const sequenceToCheck = sig.split("");
        if (
            containsAllVals(sequenceToCheck, dict[4]) &&
            containsAllVals(dict[8], sequenceToCheck)
        ) {
            return { 9: sequenceToCheck };
        } else if (
            containsAllVals(dict[8], sequenceToCheck) &&
            !containsAllVals(sequenceToCheck, dict[4]) &&
            containsAllVals(sequenceToCheck, dict[7])
        ) {
            return { 0: sequenceToCheck };
        } else {
            return { 6: sequenceToCheck };
        }
    });
    return decoded906.filter(Boolean);
};

const containsAllVals = (arr, target) => target.every((v) => arr.includes(v));
const containSameVals = (arr1, arr2) =>
    containsAllVals(arr1, arr2) && containsAllVals(arr2, arr1);

// decode 1478
puzzleInput.map((display) => {
    display.decodedDict = {
        0: [],
        1: [],
        2: [],
        3: [],
        4: [],
        5: [],
        6: [],
        7: [],
        8: [],
        9: [],
    };
    display.usp.forEach((each) => {
        if (is1(each)) display.decodedDict[1] = each.split("");
        if (is4(each)) display.decodedDict[4] = each.split("");
        if (is7(each)) display.decodedDict[7] = each.split("");
        if (is8(each)) display.decodedDict[8] = each.split("");
    });
    return display;
});

// decode 069 AND 235
puzzleInput.map((display) => {
    const decoded906 = decode906(display.usp, display.decodedDict);
    if (decoded906.length > 0) {
        decoded906.forEach((decodedObj) => {
            for (let prop in decodedObj) {
                display.decodedDict[prop] = decodedObj[prop];
            }
        });
    }
    const decoded325 = decode325(display.usp, display.decodedDict);
    if (decoded325.length > 0) {
        decoded325.forEach((decodedObj) => {
            for (let prop in decodedObj) {
                display.decodedDict[prop] = decodedObj[prop];
            }
        });
    }
});

/// now all displays have a decoded dictionary
puzzleInput.map((display) => {
    let decodeOutVals = "";
    display.outVal.forEach((outVal) => {
        const outValToCheck = outVal.split("");
        for (let key in display.decodedDict) {
            if (containSameVals(outValToCheck, display.decodedDict[key])) {
                decodeOutVals += key;
            }
        }
    });

    display.decoded = decodeOutVals;
    return display;
});
// decoded outputVals with dictionaries
let sumOfSignals = 0;
puzzleInput.forEach((display) => {
    sumOfSignals += Number(display.decoded);
});
console.log("Part 2sumOfSignals", sumOfSignals);
