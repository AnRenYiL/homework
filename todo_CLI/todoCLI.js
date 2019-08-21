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
let inSave = false;
let inNew = false;

function todoCLI() {
    console.log('Welcome to Todo CLI!');
    console.log('--------------------');
    console.log('(v) View • (n) New • (cX) Complete • (dX) Delete • (s) Save • (q) Quit \n');
    rl.prompt();
    rl.on('line', (answer) => {
        if (inSave) {
            saveItems(answer);
        } else if (inNew) {
            newItem(answer);
            console.log('\n(v) View • (n) New • (cX) Complete • (dX) Delete • (s) Save • (q) Quit \n');
            inNew = false;
            rl.prompt();
        } else {
            if (answer === 'v') {
                viewItems();
                console.log('\n(v) View • (n) New • (cX) Complete • (dX) Delete • (s) Save • (q) Quit \n');
            } else if (answer === 'q') {
                console.log('\nSee you soon! 😄');
                process.exit(0);
            } else if (answer === 'n') {
                inNew = true;
                console.log('\nWhat? \n');
            } else if (answer.indexOf('c') == 0) {
                completeItem(answer.substring(1, answer.length));
                console.log('\n(v) View • (n) New • (cX) Complete • (dX) Delete • (s) Save • (q) Quit \n');
            } else if (answer.indexOf('d') == 0) {
                deleteItem(answer.substring(1, answer.length));
                console.log('\n(v) View • (n) New • (cX) Complete • (dX) Delete • (s) Save • (q) Quit \n');
            } else if (answer === 's') {
                inSave = true;
                let question = '';
                jsonFilename == null ? question = '\nWhere? \n' : question = `\nWhere? (${jsonFilename})\n`;
                console.log(question);
            } else {
                console.log('\n(v) View • (n) New • (cX) Complete • (dX) Delete • (s) Save • (q) Quit \n');
            }
            rl.prompt();
        }
    });

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
            console.log("\nList is empty...");
        }
    }

    function newItem(answer) {
        // push the new item into todoList
        todoList.push({
            completed: false,
            title: answer
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

    function saveItems(answer) {
        let saveFilename = '';
        if (answer) {
            saveFilename = answer;
        } else {
            saveFilename = jsonFilename;
        }
        if ((answer == null || answer == '') && (jsonFilename == null)) {
            console.log("please write the name\n");
        } else {
            const fs = require('fs');
            // JSON.stringify convert array to json string
            fs.writeFile(saveFilename, JSON.stringify(todoList), (err) => {
                if (err) {
                    console.log('ERROR HAPPENED');
                } else {
                    console.log(`List saved to "${saveFilename}"\n`);
                }
                console.log('\n(v) View • (n) New • (cX) Complete • (dX) Delete • (s) Save • (q) Quit \n');
                inSave = false;
                rl.prompt();
            });
        }
    }
}