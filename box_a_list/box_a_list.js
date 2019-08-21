#! /usr/bin/env node

const fs = require('fs');
const parametersArr = process.argv;

//#region functions
const drawLine = (number) => '\u2501'.repeat(number);
const drawTopBorder = (number) => '\u250f' + drawLine(number) + '\u2513';
const drawMiddleBorder = (number) => '\u2523' + drawLine(number) + '\u252b';
const drawBottomBorder = (number) => '\u2517' + drawLine(number) + '\u251b';
const drawBarsByStr = (str, number) => '\u2503' + str.padEnd(number, ' ') + '\u2503';


const drawTop = (nF, nL) => '\u250f' + drawLine(nF) + '\u2533' + drawLine(nL) + '\u2513';
const drawMiddle = (nF, nL) => '\u2523' + drawLine(nF) + '\u254b' + drawLine(nL) + '\u252b';
const drawBottom = (nF, nL) => '\u2517' + drawLine(nF) + '\u253b' + drawLine(nL) + '\u251b';
const drawByStr = (strF, strL, nF, nL) => '\u2503' + strF.padEnd(nF, ' ') + '\u2503' + strL.padEnd(nL, ' ') + '\u2503';
//#endregion

if (parametersArr.length <= 2) {
    console.log(drawTopBorder(0));
    console.log(drawBottomBorder(0));
} else {
    if (process.argv[2].split('.')[1] === 'csv') {
        fs.readFile(process.argv[2], (err, data) => {
            if (err) {
                console.log('Error reading file');
            } else {
                const lines = data.toString().split('\n');
                let firstNameArr = [];
                let lastNameArr = [];
                for (const item of lines) {
                    const temp = item.split(',');
                    firstNameArr.push(temp[0]);
                    lastNameArr.push(temp[1]);
                }
                let maxFirstNameLength = 0;
                let maxLastNameLength = 0;
                for (let i = 0; i < lastNameArr.length; i++) {
                    if (maxFirstNameLength < firstNameArr[i].length) {
                        maxFirstNameLength = firstNameArr[i].length;
                    }
                    if (maxLastNameLength < lastNameArr[i].length) {
                        maxLastNameLength = lastNameArr[i].length;
                    }
                }
                console.log(drawTop(maxFirstNameLength, maxLastNameLength));
                for (let i = 0; i < firstNameArr.length; i++) {
                    console.log(drawByStr(firstNameArr[i], lastNameArr[i], maxFirstNameLength, maxLastNameLength));
                    if (!(firstNameArr.length - 1 == 0 || i == firstNameArr.length - 1)) {
                        console.log(drawMiddle(maxFirstNameLength, maxLastNameLength));
                    }
                }
                console.log(drawBottom(maxFirstNameLength, maxLastNameLength));
            }
        });
    } else {
        let maxlength = 0;
        for (let i = 2; i < parametersArr.length; i++) {
            if (maxlength < parametersArr[i].length) {
                maxlength = parametersArr[i].length;
            }
        }
        console.log(drawTopBorder(maxlength));
        for (let i = 2; i < parametersArr.length; i++) {
            console.log(drawBarsByStr(parametersArr[i], maxlength));
            if (!(parametersArr.length - 1 == 0 || i == parametersArr.length - 1)) {
                console.log(drawMiddleBorder(maxlength));
            }
        }
        console.log(drawBottomBorder(maxlength));
    }
}


//#region without functions
/* 
const parametersArr = process.argv;
if (parametersArr.length <= 2) {
    console.log("\u250c\u2510\n\u2514\u2518");
} else {
    let maxlength = 0;
    for (let i = 2; i < parametersArr.length; i++) {
        if (maxlength < parametersArr[i].length) {
            maxlength = parametersArr[i].length;
        }
    }
    console.log('\u250c' + '\u2500'.repeat(maxlength) + '\u2510');
    for (let i = 2; i < parametersArr.length; i++) {
        console.log('\u2502' + parametersArr[i].padEnd(maxlength, ' ') + '\u2502');
        if (!((i == parametersArr.length - 1 && i == 0) || i == parametersArr.length - 1)) {
            console.log('\u251c' + '\u2500'.repeat(maxlength) + '\u2524');
        }
    }
    console.log('\u2514' + '\u2500'.repeat(maxlength) + '\u2518');
}
*/
//#endregion