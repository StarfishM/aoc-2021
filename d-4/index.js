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
const buildWinningSum = (boardObj) => {
    let sumTotal = 0;
    for (let prop in boardObj.rows) {
        boardObj.rows[prop] = boardObj.rows[prop].map((each) => +each);
        boardObj.rows[prop].filter(
            (each) => !boardObj.numsDrawn.includes(each)
        );
        const filterOutDrawnNums = boardObj.rows[prop].filter(
            (each) => !boardObj.numsDrawn.includes(each)
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

/////// PART 2 find the last board to win

// tweak func for part 2
const checkForLastToWin = (drawNumArr, boardArr, slicePoint = 5) => {
    const winningNums = drawNumArr.slice(0, slicePoint);
    let lastBingoWon;
    for (let i = 0; i < boardArr.length; i++) {
        const { rows, cols } = boardArr[i];
        if (boardArr[i].bingo) {
            continue;
        } else {
            for (var prop in rows) {
                if (
                    rows[prop].every((each) => winningNums.includes(+each)) ||
                    cols[prop].every((each) => winningNums.includes(+each))
                ) {
                    boardArr[i].bingo = true;
                    boardArr[i].numsDrawn = winningNums;
                    boardArr[i].winningNum =
                        winningNums[winningNums.length - 1];
                    lastBingoWon = boardArr[i];
                }
            }
        }
    }
    const numOfBoardHaveWon = boardArr.filter((each) => each.bingo);
    if (numOfBoardHaveWon.length === boardArr.length) {
        return lastBingoWon;
    } else {
        slicePoint++;
        return checkForLastToWin(drawNumArr, boardArr, slicePoint);
    }
};

// const lastWinningBoard = checkForLastToWin(testDrawNums, testInput);
const lastWinningBoard = checkForLastToWin(drawNums, input);
console.log("------- part 2", buildWinningSum(lastWinningBoard));
