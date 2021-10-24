#!/usr/bin/env node

(async function () {
  const { getTargetAction, initPrompt, getProjectName, getProjectDir, selectExtraDependencies, confirmEnteredDetails } = require('./controllers/prompts')
  const controller = require('./controllers/main')

  initPrompt()

  const { targetAction } = await getTargetAction()
  if (targetAction === 0) {
    const { projectName } = await getProjectName(targetAction)
    const projectRootDir = await getProjectDir(projectName)
    const { dependencies } = await selectExtraDependencies()

    process.stdout.write('\033c');
    console.log('Here is the captured information')
    let final = {
      'Project Name': projectName,
      'Project Root Folder': projectRootDir,
      'Additional Dependencies': dependencies
    }
    console.log(final)
    let { inputCorrect } = await confirmEnteredDetails(final)
    console.log(inputCorrect)
    if (inputCorrect) {
      process.stdout.write('\033c');
      controller.initialize({ projectName, projectRootDir, dependencies })
    }
  } else if (targetAction === 1) {
    const { getResourceName, selectExtraResourceFiles, selectResourceFolder } = require('./controllers/prompts')

    const { resourceName } = await getResourceName()
    console.log(`
      - The following files will be created to the project resources folder
      ** ${resourceName}.routes.js
      ** ${resourceName}.model.js      
      ** ${resourceName}.controller.js
    `)

    const { resourceFiles } = await selectExtraResourceFiles(resourceName)
    const resourceRootDir = await selectResourceFolder()

    console.log('Here is the captured information')
    let final = {
      'Resource Name': resourceName,
      'Resource Root Directory': resourceRootDir,
      'Additional Files': resourceFiles
    }
    console.log(final)
    let { inputCorrect } = await confirmEnteredDetails(final)
    console.log(inputCorrect)
    if (inputCorrect) {
      process.stdout.write('\033c');
      controller.createResource({ resourceName, resourceRootDir, resourceFiles })
    }


    // process.stdout.write('\033c');
    // process.exit()

  } else if (targetAction === 2) {

    console.log('Thank you for using this generator')
    process.exit()
  }

})();



// "bin": {
//   "init": "src/index.js",
//   "resource": "dist/NewResource/index.js"
// },