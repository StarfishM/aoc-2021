const { testInput, input, drawNums, testDrawNums } = require("./input");
// loop over draw nums, check for win
// if winning board is found:
// filter out numbers that have been drawn
// calculate winning board sum
// multiply with winning number
const checkForWin = (drawNumArr, boardArr, slicePoint = 5) => {
    let bingo = false;
    const winningNums = drawNumArr.slice(0, slicePoint);

    for (let i = 0; i < boardArr.length; i++) {
        const { rows, cols } = boardArr[i];
        for (var prop in rows) {
            if (
                rows[prop].every((each) => winningNums.includes(+each)) ||
                cols[prop].every((each) => winningNums.includes(+each))
            ) {
                bingo = true;
                boardArr[i].numsDrawn = winningNums;
                boardArr[i].winningNum = winningNums[winningNums.length - 1];
                return boardArr[i];
            }
        }
    }
    if (!bingo) {
        slicePoint++;
        return checkForWin(drawNumArr, boardArr, slicePoint);
    }
};

// const winningBoard = checkForWin(testDrawNums, testInput);
const winningBoard = checkForWin(drawNums, input);
console.log(winningBoard);
const buildWinningSum = (boardObj) => {
    let sumTotal = 0;
    for (let prop in boardObj.rows) {
        boardObj.rows[prop].filter(
            (each) => !boardObj.numsDrawn.includes(each)
        );
        const filterOutDrawnNums = boardObj.rows[prop].filter(
            (each) => !boardObj.numsDrawn.includes(+each)
        );
        if (filterOutDrawnNums.length > 0)
            sumTotal += filterOutDrawnNums.reduce(
                (a, b) => Number(a) + Number(b)
            );
    }
    return sumTotal * boardObj.winningNum;
};
///// PART 1
console.log(buildWinningSum(winningBoard));
