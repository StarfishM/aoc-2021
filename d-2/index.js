/*The submarine seems to already have a planned course (your puzzle input). You should probably figure out where it's going. For example:

forward 5
down 5
forward 8
up 3
down 8
forward 2
Your horizontal position and depth both start at 0. The steps above would then modify them as follows:

forward 5 adds 5 to your horizontal position, a total of 5.
down 5 adds 5 to your depth, resulting in a value of 5.
forward 8 adds 8 to your horizontal position, a total of 13.
up 3 decreases your depth by 3, resulting in a value of 2.
down 8 adds 8 to your depth, resulting in a value of 10.
forward 2 adds 2 to your horizontal position, a total of 15.
After following these instructions, you would have a horizontal position of 15 and a depth of 10. (Multiplying these together produces 150.) */

const { testInput, input } = require("./input");

function getPosition(arr) {
    let x = 0;
    let y = 0;
    arr.forEach((each) => {
        if (each.forward) {
            x += each.forward;
        } else {
            each.up ? (y -= each.up) : (y += each.down);
        }
    });
    return x * y;
}

// getPostition(testInput);
////PART 1
console.log("Part 1 Postition:", getPosition(input));

//////////////////// PART 2
/*In addition to horizontal position and depth, you'll also need to track a third value, aim, which also starts at 0. The commands also mean something entirely different than you first thought:

down X increases your aim by X units.
up X decreases your aim by X units.
forward X does two things:
It increases your horizontal position by X units.
It increases your depth by your aim multiplied by X.
 */

function getPositionWithAim(arr) {
    let x = 0;
    let y = 0;
    let aim = 0;
    arr.forEach((each) => {
        if (each.forward) {
            x += each.forward;
            // increases depth by x*aim
            y += each.forward * aim;
        } else {
            // dowm aim goes up!! up aim goes down
            each.up ? (aim -= each.up) : (aim += each.down);
        }
    });
    return x * y;
}

console.log("Part 2 Postition:", getPositionWithAim(input));
