const { testInput, input } = require("./input.js");

class LinePoint {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.p = 0;
    }
}

function createLineMatrix(xLength, yLength) {
    let arrOfPoints = [];
    for (let x = 0; x <= xLength; x++) {
        for (let y = 0; y <= yLength; y++) {
            let pointObj = new LinePoint(x, y);
            arrOfPoints.push(pointObj);
        }
    }
    return arrOfPoints;
}
const matrixToCheck = createLineMatrix(
    testInput.length - 1,
    testInput.length - 1
);
// const matrixToCheck = createLineMatrix(input.length - 1, input.length - 1);

function drawLines(startX, startY, endX, endY, matrix) {
    for (let i = 0; i < matrix.length; i++) {
        //find min max for range to check
        const minX = startX < endX ? startX : endX;
        const maxX = startX > endX ? startX : endX;
        const minY = startY < endY ? startY : endY;
        const maxY = startY > endY ? startY : endY;
        //For now, only consider horizontal and vertical lines: lines where either x1 = x2 or y1 = y2.
        if (startX === endX || startY === endY) {
            if (
                matrix[i].x >= minX &&
                matrix[i].x <= maxX &&
                matrix[i].y >= minY &&
                matrix[i].y <= maxY
            ) {
                matrix[i].p++;
            }
        }
    }
}

testInput.forEach((each) => {
    drawLines(each.x1, each.y1, each.x2, each.y2, matrixToCheck);
});
// input.forEach((each) => {
//     drawLines(each.x1, each.y1, each.x2, each.y2, matrixToCheck);
// });
console.log(matrixToCheck.filter((each) => each.p >= 2).length);
//1259 too low
// 1280 too low
