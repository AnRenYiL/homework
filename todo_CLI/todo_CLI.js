const readline = require('readline');
const rl = readline.Interface({
    input: process.stdin,
    output: process.stdout,
    prompt: '> '
});

console.log('Welcome to Todo CLI!');
console.log('--------------------');
let todoList = [];

rl.question('(v) View • (n) New • (cX) Complete • (dX) Delete • (q) Quit \n',
    answer => {
        tryAgain(answer)
    });

function tryAgain(answer) {
    if (answer === 'v') {
        viewItems();
        rl.question('(v) View • (n) New • (cX) Complete • (dX) Delete • (q) Quit \n', answer => tryAgain(answer));
    } else if (answer === 'q') {
        console.log('\nSee you soon! 😄');
        rl.close();
    } else if (answer === 'n') {
        newItem();
    } else if (answer.indexOf('c') == 0) {
        completeItem(answer.substring(1, answer.length));
        rl.question('(v) View • (n) New • (cX) Complete • (dX) Delete • (q) Quit \n', answer => tryAgain(answer));
    } else if (answer.indexOf('d') == 0) {
        deleteItem(answer.substring(1, answer.length));
        rl.question('(v) View • (n) New • (cX) Complete • (dX) Delete • (q) Quit \n', answer => tryAgain(answer));
    } else {
        rl.question('(v) View • (n) New • (cX) Complete • (dX) Delete • (q) Quit \n', answer => tryAgain(answer));
    }
}

function viewItems() {
    console.log();
    if (todoList.length > 0) {
        todoList.forEach((element, index) => {
            let comp;
            element.complete ? comp = '[✓]' : comp = '[ ]';
            console.log(`${index} ${comp} ${element.text}`);
        });
    } else {
        console.log("List is empty...");
    }
    console.log();
}

function newItem() {
    console.log();
    rl.question('What? \n', answer => {
        todoList.push({
            complete: false,
            text: answer
        });
        console.log();
        tryAgain('');
    });
}

function completeItem(index) {
    console.log();
    if (todoList[index]) {
        todoList[index].complete = true;
        console.log(`Completed "${todoList[index].text}"`);
    } else {
        console.log(`Don't have item ${index}`);
    }
    console.log();
}

function deleteItem(index) {
    console.log();
    console.log(`Deleted "${todoList[index].text}"`);
    todoList.splice(index, 1);
    console.log();
}