const { testInput, input } = require("./input.js");
const pointsDrawn = {};
const addPoints = (pointCoords) =>
    !pointsDrawn[pointCoords]
        ? (pointsDrawn[pointCoords] = 1)
        : pointsDrawn[pointCoords]++;

function drawLines(x1, y1, x2, y2) {
    //find min max for range to check
    const minX = Math.min(x1, x2);
    const maxX = Math.max(x1, x2);
    const minY = Math.min(y1, y2);
    const maxY = Math.max(y1, y2);
    //For now, only consider horizontal and vertical lines: lines where either x1 = x2 or y1 = y2.
    if (x1 === x2 && y1 === y2) {
        // just one spot gets drawn on
        addPoints(`${x1},${y1}`);
    } else if (x1 === x2) {
        for (let y = minY; y <= maxY; y++) {
            addPoints(`${x1},${y}`);
        }
    } else if (y1 === y2) {
        for (let x = minX; x <= maxX; x++) {
            addPoints(`${x},${y1}`);
        }
    }
}

function drawDiagonals(x1, y1, x2, y2) {
    if (x1 != x2 && y1 != y2) {
        if (x1 > x2 && y1 < y2) {
            //draw diagonal down right
            // decrease x and at the same time decrease y2
            for (let x = x1; x >= x2; x--) {
                addPoints(`${x},${y1}`);
                y1++;
            }
        } else if (x1 > x2 && y1 > y2) {
            //draw diagonal down left
            // decrease x and at the same time decrease y1
            for (let x = x1; x >= x2; x--) {
                addPoints(`${x},${y1}`);
                y1--;
            }
        } else if (x1 < x2 && y1 < y2) {
            // draw diagonal up right
            // at same time increase y1
            for (let x = x1; x <= x2; x++) {
                addPoints(`${x},${y1}`);
                y1++;
            }
        } else if (x1 < x2 && y1 > y2) {
            // draw diagonal up left right
            // at same time decrease y1
            for (let x = x1; x <= x2; x++) {
                addPoints(`${x},${y1}`);
                y1--;
            }
        }
    }
}

// testInput.forEach((each) => {
//     drawLines(each.x1, each.y1, each.x2, each.y2);
//     drawDiagonals(each.x1, each.y1, each.x2, each.y2);
// });
input.forEach((each) => {
    drawLines(each.x1, each.y1, each.x2, each.y2);
    drawDiagonals(each.x1, each.y1, each.x2, each.y2);
});

let crossOverCount = 0;
for (var coords in pointsDrawn) {
    if (pointsDrawn[coords] >= 2) crossOverCount++;
}
console.log("crossOverCount PART 2", crossOverCount);
