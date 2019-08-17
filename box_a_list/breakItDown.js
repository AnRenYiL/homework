const drawLine = (number) => '\u2501'.repeat(number);
// console.log(drawLine(4));
const drawTopBorder = (number) => '\u250f' + '\u2501'.repeat(number) + '\u2513';
// console.log(drawTopBorder(4));
// console.log(drawTopBorder(0));
const drawMiddleBorder = (number) => '\u2523' + '\u2501'.repeat(number) + '\u252b';
// console.log(drawMiddleBorder(4));
// console.log(drawMiddleBorder(0));
const drawBottomBorder = (number) => '\u2517' + '\u2501'.repeat(number) + '\u251b';
// console.log(drawBottomBorder(4));
// console.log(drawBottomBorder(0));
const drawBarsAround = (str) => '\u2503' + str + '\u2503';
// console.log(drawBarsAround("My name is Dan"));
// returns "┃My name is Dan┃"
// console.log(drawBarsAround("You are Jane  "));
// returns "┃You are Jane  ┃"
// console.log(drawBarsAround("  You are Bill"));
// returns "┃  You are Bill┃"
function boxIt(arr) {
    let result = '';
    let maxlength = 0;
    for (let i = 0; i < arr.length; i++) {
        if (maxlength < arr[i].length) {
            maxlength = arr[i].length;
        }
    }
    result += drawTopBorder(maxlength) + '\n';
    for (let i = 0; i < arr.length; i++) {
        result += drawBarsByStr(arr[i], maxlength) + '\n';
        if (!((i == arr.length - 1 && i == 0) || i == arr.length - 1)) {
            result += drawMiddleBorder(maxlength) + '\n';
        }
    }
    result += drawBottomBorder(maxlength);
    return result;
}
const drawBarsByStr = (str, number) => '\u2503' + str.padEnd(number, ' ') + '\u2503';
console.log(boxIt(['Jon Snow', 'Cersei Lannister']));