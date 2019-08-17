const readline = require('readline');
const rl = readline.Interface({
    input: process.stdin,
    output: process.stdout,
    prompt: '> ' // use rl.prompt() to get it, but I don't know how to use it in question()
});
let todoList = []; // all the todo thing put into this array
const jsonFilename = process.argv[2];
// check if jsonFilename is null or not
if (jsonFilename) { // not null
    const fs = require('fs');
    // read data
    fs.readFile(jsonFilename, (err, data) => {
        if (err) {
            console.log('Error reading file');
        } else {
            // convert string into json data and give it to todoList
            todoList = JSON.parse(data);
            todoCLI();
        }
    });
} else { // null
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
        // if there has items in todoList, use for loop to log every item
        if (todoList.length > 0) {
            todoList.forEach((element, index) => {
                // put a checkmark in front of the title if the completed is true
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
            // push the new item into todoList
            todoList.push({
                completed: false,
                title: answer
            });
            console.log();
            tryAgain('');
        });
    }

    function completeItem(index) {
        // if todoList has this index, change the completed=true
        // if not, log don't have this item
        if (todoList[index]) {
            todoList[index].completed = true;
            console.log(`\nCompleted "${todoList[index].title}"\n`);
        } else {
            console.log(`\nDon't have item ${index}\n`);
        }
    }

    function deleteItem(index) {
        console.log(`\nDeleted "${todoList[index].title}"`);
        //get rid of an item from todoList by the index
        // splice will remove item(s) from index, the next argument is the amount to remove
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
                // JSON.stringify convert array to json string
                fs.writeFile(saveFilename, JSON.stringify(todoList), (err) => {
                    if (err) {
                        console.log('ERROR HAPPENED');
                    } else {
                        console.log(`List saved to "${saveFilename}"\n`);
                        tryAgain('');
                    }
                });
            }
        });
    }
}