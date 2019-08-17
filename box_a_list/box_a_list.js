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