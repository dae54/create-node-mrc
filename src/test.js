// const fs = require("fs");
// const { colormsg, installDependency, exec, hasCharacter, terminateNode } = require("../lib/common");

// // npx create-node-mrc [appname]

// function sanitize(projectName) {
//   if (hasCharacter(projectName, ' ')) throw 'Project Name must be a single word'
//   if (fs.existsSync(projectName)) throw `Folder named ${projectName} already exists. Change the folder name to proceed`
//   return projectName.toLowerCase()
// }

// (async function () {
//   const project_name = process.argv.splice(2)[0];
//   if (!project_name) {
//     throw "Missing required argument, 'Project_name'"
//   }
//   const projName = sanitize(project_name)

// })().catch(error => {
//   terminateNode(error)
// })

// const Select = require('../lib/Select')

// const jsFrameworkSel = new Select({
//   question: "Which of these is your fav JS framework?",
//   options: ["Angular", "React", "Vue", "Svelte"],
//   answers: ["angular", "react", "vue", "svelte"],
//   pointer: ">",
//   color: "magenta"
// })

// jsFrameworkSel.start()


// const { program } = require('commander');

// program
//   .option('-d, --debug', 'output extra debugging')
//   .option('-s, --small', 'small pizza size')
//   .option('-p, --pizza-type <type>', 'flavour of pizza');

// program.parse(process.argv);

// const options = program.opts();
// if (options.debug) console.log(options);
// console.log('pizza details:');
// if (options.small) console.log('- small pizza size');
// if (options.pizzaType) console.log(`- ${options.pizzaType}`);

var inquirer = require('inquirer');

inquirer
    .prompt([
        {
            type: 'checkbox',
            message: 'Select toppings',
            name: 'toppings',
            choices: [
                new inquirer.Separator(' = The Meats = '),
                {
                    name: 'Pepperoni',
                },
                {
                    name: 'Ham',
                },
                {
                    name: 'Ground Meat',
                },
                {
                    name: 'Bacon',
                },
            ],
            validate(answer) {
                if (answer.length < 1) {
                    return 'You must choose at least one topping.';
                }

                return true;
            },
        },
    ])
    .then((answers) => {
        console.log(JSON.stringify(answers, null, '  '));
    });