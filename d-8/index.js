const { testInput, input } = require("./input.js");

const puzzleInput = testInput;

// PART 1
// only care about outputs
const allOutputs = [...puzzleInput.map((each) => each.outVal)].flat();

const is1 = (str) => {
    return str.length === 2;
};
const is4 = (str) => {
    return str.length === 4;
};
const is7 = (str) => {
    return str.length === 3;
};
const is8 = (str) => {
    return str.length === 7;
};
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
// set 1 -set 2 not the same as set 2 -set 1
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
// const decode1478 = (str) => {
//     if (is1(str)) return 1;
//     if (is4(str)) return 4;
//     if (is7(str)) return 7;
//     if (is8(str)) return 8;
//     if (!is1(str) && !is4(str) && !is7(str) && !is8(str)) {
//         // return undefined;
//         if (is235(str)) {
//             console.log("str:", str);
//         }
//     }
// };

const decode3 = (str, dict, numToCheck) => {
    // 3 contains all of 7
    if (str.length != 5) return;
    const sequenceToCheck = str.split("");
    if (containsAllVals(sequenceToCheck, dict[1])) {
        return sequenceToCheck;
    }
};

const decode9 = (str, dict) => {
    // 0 is contained by 8
    // all of 4 is in 9 and 6, all of but not in 0
    // all of 3 is in 9 but not in 6
    if (str.length != 6) return;
    const sequenceToCheck = str.split("");
    if (
        containsAllVals(sequenceToCheck, dict[4]) &&
        containsAllVals(sequenceToCheck, dict[3])
    ) {
        return sequenceToCheck;
    }
};

const decode0 = (str, dict) => {
    // all of 0 is in 8 but 4 is not in 0
    if (str.length != 6) return;
    const sequenceToCheck = str.split("");

    if (
        containsAllVals(dict[8], sequenceToCheck) &&
        !containSameVals(sequenceToCheck, dict[9]) &&
        !containsAllVals(dict[4], sequenceToCheck)
    ) {
        return sequenceToCheck;
    }
};

const decode6 = (str, dict) => {
    // 0 and 9 exist, so has to be 6
    if (str.length != 6) return;
    const sequenceToCheck = str.split("");
    console.log("dict[0]", dict[0]);
    console.log("dict[9]", dict[9]);
    console.log("sequenceToCheck", sequenceToCheck);
    console.log(
        !containsAllVals(dict[0], sequenceToCheck) &&
            !containsAllVals(dict[9], sequenceToCheck)
    );
    if (
        !containsAllVals(dict[0], sequenceToCheck) &&
        !containsAllVals(dict[9], sequenceToCheck)
    ) {
        return sequenceToCheck;
    }
};
const decode5 = (str, dict) => {
    // all of 5 is in 6, not all of 2 nor all of 3 is in 6
    if (str.length != 5) return;
    const sequenceToCheck = str.split("");

    if (
        containsAllVals(dict[6], sequenceToCheck) &&
        !containSameVals(sequenceToCheck, dict[3])
    ) {
        return sequenceToCheck;
    }
};

const decode2 = (str, dict) => {
    //decoded 3 and 5 so has to be two
    if (str.length != 5) return;
    const sequenceToCheck = str.split("");

    if (
        !containSameVals(dict[3], sequenceToCheck) &&
        !containSameVals(dict[5], sequenceToCheck) &&
        !containsAllVals(sequenceToCheck, dict[1])
    ) {
        return sequenceToCheck;
    }
};
const containsAllVals = (arr, target) => target.every((v) => arr.includes(v));
const containSameVals = (arr1, arr2) =>
    containsAllVals(arr1, arr2) && containsAllVals(arr2, arr1);
const is235 = (str) => str.length === 5;
// 3 contains all of 7
// whatever is left over is the character that is in 2 and 5
// 2 and 5 have one different this differenece 2 shares with 3
const is069 = (str) => str.length === 6;
// 0 is contained in 8
// 0 has one difference to 9
// 9 has one difference to 8
// 6 has one difference to 8
// 6 and 9 have one difference
// 0 has one difference to 6 and 9 that the two of them have in
// common

// decode 1478
// puzzleInput.forEach((display) => {
//     display.outVal.forEach((each) => {
//         decode1478(each);
//     });
// });

// puzzleInput.forEach((display) => {
//     display.outVal.forEach((each) => {
//         if (is235(each)) decode235(each);
//     });
// });

// decode 1478
puzzleInput.map((display) => {
    // display.decoded = [];
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
        // display.decoded.push(decode1478(each));
        if (is1(each)) display.decodedDict[1] = each.split("");
        if (is4(each)) display.decodedDict[4] = each.split("");
        if (is7(each)) display.decodedDict[7] = each.split("");
        if (is8(each)) display.decodedDict[8] = each.split("");
    });
    return display;
});

//decode 235 & 069
puzzleInput.map((display) => {
    display.usp.forEach((each) => {
        const sequenceFor3 = decode3(each, display.decodedDict);
        if (sequenceFor3) display.decodedDict[3] = sequenceFor3;
        const sequenceFor9 = decode9(each, display.decodedDict);
        if (sequenceFor9) display.decodedDict[9] = sequenceFor9;
        const sequenceFor0 = decode0(each, display.decodedDict);
        if (sequenceFor0) display.decodedDict[0] = sequenceFor0;
        const sequenceFor6 = decode6(each, display.decodedDict);
        if (sequenceFor6) display.decodedDict[6] = sequenceFor6;
        const sequenceFor5 = decode5(each, display.decodedDict);
        if (sequenceFor5) display.decodedDict[5] = sequenceFor5;
        const sequenceFor2 = decode2(each, display.decodedDict);
        if (sequenceFor2) display.decodedDict[2] = sequenceFor2;
    });
});

console.log("puzzleInput:", puzzleInput[3]);

/// now all displays have a decoded dictionary
// puzzleInput.map((display) => {
//     let decodeOutVals = "";
//     display.outVal.forEach((outVal) => {
//         const outValToCheck = outVal.split("");
//         for (let key in display.decodedDict) {
//             if (containSameVals(outValToCheck, display.decodedDict[key])) {
//                 decodeOutVals += key;
//             }
//         }
//     });

//     display.decoded = decodeOutVals;
//     return display;
// });
// // decoded outputVals with dictionaries
// let sumOfSignals = 0;
// puzzleInput.forEach((display) => {
//     sumOfSignals += Number(display.decoded);
// });
// console.log("sumOfSignals", sumOfSignals);
