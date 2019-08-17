const readline = require('readline');
const rl = readline.Interface({
    input: process.stdin,
    output: process.stdout,
    prompt: '> '
});
let todoList = [];
const jsonFilename = process.argv[2];
if (jsonFilename) {
    const fs = require('fs');
    fs.readFile(jsonFilename, (err, data) => {
        if (err) {
            console.log('Error reading file');
        } else {
            todoList = JSON.parse(data);
            todoCLI();
        }
    });
} else {
    todoCLI();
}

function todoCLI() {
    console.log('Welcome to Todo CLI!');
    console.log('--------------------');
    rl.question('(v) View • (n) New • (cX) Complete • (dX) Delete • (s) Save • (q) Quit \n',
        answer => {
            tryAgain(answer)
        });

    function tryAgain(answer) {
        if (answer === 'v') {
            viewItems();
            rl.question('(v) View • (n) New • (cX) Complete • (dX) Delete • (s) Save • (q) Quit \n', answer => tryAgain(answer));
        } else if (answer === 'q') {
            console.log('\nSee you soon! 😄');
            rl.close();
        } else if (answer === 'n') {
            newItem();
        } else if (answer.indexOf('c') == 0) {
            completeItem(answer.substring(1, answer.length));
            rl.question('(v) View • (n) New • (cX) Complete • (dX) Delete • (s) Save • (q) Quit \n', answer => tryAgain(answer));
        } else if (answer.indexOf('d') == 0) {
            deleteItem(answer.substring(1, answer.length));
            rl.question('(v) View • (n) New • (cX) Complete • (dX) Delete • (s) Save • (q) Quit \n', answer => tryAgain(answer));
        } else if (answer === 's') {
            saveItems();
        } else {
            rl.question('(v) View • (n) New • (cX) Complete • (dX) Delete • (s) Save • (q) Quit \n', answer => tryAgain(answer));
        }
    }

    function viewItems() {
        if (todoList.length > 0) {
            todoList.forEach((element, index) => {
                let comp;
                element.completed ? comp = '[✓]' : comp = '[ ]';
                console.log(`\n${index} ${comp} ${element.title}\n`);
            });
        } else {
            console.log("\nList is empty...\n");
        }
    }

    function newItem() {
        console.log();
        rl.question('What? \n', answer => {
            todoList.push({
                completed: false,
                title: answer
            });
            console.log();
            tryAgain('');
        });
    }

    function completeItem(index) {
        if (todoList[index]) {
            todoList[index].completed = true;
            console.log(`\nCompleted "${todoList[index].title}"\n`);
        } else {
            console.log(`\nDon't have item ${index}\n`);
        }
    }

    function deleteItem(index) {
        console.log(`\nDeleted "${todoList[index].title}"`);
        todoList.splice(index, 1);
        console.log();
    }

    function saveItems() {
        let question = '';
        jsonFilename == null ? question = '\nWhere? \n' : question = `\nWhere? (${jsonFilename})\n`;
        rl.question(question, answer => {
            let saveFilename = '';
            if (answer) {
                saveFilename = answer;
            } else {
                saveFilename = jsonFilename;
            }
            if ((answer == null || answer == '') && (jsonFilename == null)) {
                console.log("please write the name\n");
                tryAgain('');
            } else {
                const fs = require('fs');
                fs.writeFile(saveFilename, JSON.stringify(todoList), (err) => {
                    if (err) {
                        console.log('ERROR HAPPENED');
                    } else {
                        console.log(`List saved to "${saveFilename}\n"`);
                        tryAgain('');
                    }
                });
            }
        });
    }
}