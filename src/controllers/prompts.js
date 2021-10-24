const inquirer = require('inquirer');
const { hasCharacter } = require('../../lib/common')
const fs = require('fs');
const path = require('path');

module.exports = {
    initPrompt: () => {
        console.log(`Welcome to create-node-mrc utility tool  (-Version ${require('../../package.json').version})`)
        console.log('This utility tool helps to initialize a node express api.')
        console.log('\n')
    },
    getTargetAction: async () => {
        const data = await inquirer
            .prompt([
                {
                    type: 'list',
                    message: 'What do you want to do?',
                    name: 'targetAction',
                    choices: [
                        {
                            name: 'Initialize new node express app (MRC)',
                            value: 0,
                        },
                        {
                            name: 'Create a resource ',
                            value: 1
                        },
                        {
                            name: 'Exit',
                            value: 2
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
            .then(answers => answers)
        // console.log(data)
        return data
    },
    getProjectName: async (targetAction) => {
        const _projectName = await inquirer.prompt([
            {
                type: 'input',
                message: 'What is the name of your project?',
                name: 'projectName',
                when: targetAction === 0,
                validate(answer) {
                    if (answer.length < 1) {
                        return 'Project name is required.';
                    }
                    if (hasCharacter(answer, ' ')) {
                        return 'Project Name must be a single word.';
                    }
                    return true;
                },
            }
        ]).then(_projName => _projName)
        return _projectName
    },
    getProjectDir: async (projectName) => {
        const _projectRootDir = await inquirer.prompt([
            {
                type: 'input',
                message: 'Select the directory of your project :(leave blank to use the current folder, supply a full directory Path):',
                name: 'projectRootDir',
                when: projectName.length > 0,
                validate(answer) {
                    if (answer.length > 0) {
                        if (fs.existsSync(path.join(answer, projectName))) {
                            return "Folder already exists. Change the file name and proceed"
                        }
                    }
                    return true;
                },
                filter(input) {
                    if (input.length === 0)
                        return path.join('./')
                    return input
                }
            }
        ]).then(_projectRootDir => _projectRootDir)
        return path.join(_projectRootDir.projectRootDir, projectName)
    },
    selectExtraDependencies: async () => {
        let _extraDependencies = await inquirer
            .prompt([
                {
                    type: 'checkbox',
                    message: 'Select addtional dependencies to add to your project',
                    name: 'dependencies',
                    choices: [
                        {
                            name: 'jsonwebtoken',
                        },
                        {
                            name: 'bcrypt',
                        },
                        {
                            name: 'moment',
                        },
                    ],
                },
            ])
            .then((answers) => answers);
        return _extraDependencies
    },
    confirmEnteredDetails: async () => {
        let _answer = await inquirer.prompt([
            {
                type: 'confirm',
                message: 'Did we capture everthing correctly?',
                name: 'inputCorrect',
            }
        ]).then(_answer => _answer)
        return _answer
    },
    /**NEW RESOURCE PROMPTS */
    getResourceName: async () => {
        let _resourceName = await inquirer.prompt([
            {
                type: 'input',
                message: 'What is the name of your resource?',
                name: 'resourceName',
                validate(answer) {
                    if (answer.length < 1) {
                        return 'Resource name is required.';
                    }
                    if (hasCharacter(answer, ' ')) {
                        return 'Resource Name must be a single word.';
                    }
                    return true;
                },
            }
        ]).then(_resourceName => _resourceName)
        return _resourceName
    },
    selectExtraResourceFiles: async (resourceName) => {
        let _extraResourceFiles = await inquirer
            .prompt([
                {
                    type: 'checkbox',
                    message: 'Select addtional files to add to your resource',
                    name: 'resourceFiles',
                    choices: [
                        { name: `${resourceName}.service.js` },
                        { name: `${resourceName}.README.md` },
                        { name: `${resourceName}.service.test.js` },
                        { name: `${resourceName}.controller.test.js` },
                    ]
                },
            ])
            .then((answers) => answers);
        return _extraResourceFiles
    },
    selectResourceFolder: async () => {
        let _resourceFolder = await inquirer.prompt([
            {
                type: 'input',
                message: 'Select the directory of your resources :(Leave blank to use the default folder; supply a full directory Path):',
                name: 'resourceRootDir',
                validate(answer) {
                    if (answer.length > 0) {
                        if (fs.existsSync(path.join(answer))) {
                            return true
                        }
                    }
                    return "Folder path provided does not exists. Change the file name and proceed"
                },
                filter(input) {
                    if (input.length === 0)
                        return path.join('./src/resources/')
                    return input
                }
            }
        ]).then(_resourceFolder => _resourceFolder)
        return path.join(_resourceFolder.resourceRootDir)
    },
}