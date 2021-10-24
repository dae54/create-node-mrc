const { colormsg, installDependency, exec, terminateNode } = require("../../lib/common");
const fs = require('fs');
const { generateBaseController, generateBaseModel, generateBaseRoutes } = require("../../dist/NewResource/script");
const path = require("path");

module.exports = {
    initialize(config) {
        createProjectFolder(config)

        initializeGitRepository(config)

        initializeNodeApp(config)
    },
    createResource(config) {
        createResourceFolder(config)

        commitNewResource(config)
    }
}

function createResourceFolder(config) {
    const { writeFile } = require("fs").promises;

    colormsg("info", "Creating Resource folder...", "IN");
    fs.mkdirSync(path.join(config.resourceRootDir, config.resourceName), { recursive: true });

    colormsg("success", "Resource folder created...", "OUT");
    colormsg("info", "Creating resources files...", "IN");

    writeFile(
        `${config.resourceRootDir}/${config.resourceName}/${config.resourceName}.controller.js`,
        generateBaseController(config.resourceName), { encoding: "utf-8", }
    );
    writeFile(
        `${config.resourceRootDir}/${config.resourceName}/${config.resourceName}.model.js`,
        generateBaseModel(config.resourceName), { encoding: "utf-8", }
    );
    writeFile(
        `${config.resourceRootDir}/${config.resourceName}/${config.resourceName}.routes.js`,
        generateBaseRoutes(config.resourceName), { encoding: "utf-8", }
    );

    config.resourceFiles.forEach(file => {
        writeFile(
            `${config.resourceRootDir}/${config.resourceName}/${file}`,
            `//${file} `, { encoding: "utf-8", }
        );
    })
    colormsg("success", "Done Creating project folder...", "OUT");
}

async function commitNewResource(config) {
    colormsg("info", "Commiting resources files...", "IN");

    await exec(`
        cd ${config.resourceRootDir}/${config.resourceName};
        git add . ;
        git commit -m "create resource ${config.resourceName} by 'create-node-mrc'"
    `);
    colormsg("success", "Done Commiting resources files...", "OUT");

}



function createProjectFolder(config) {
    colormsg("info", "Creating project folder...", "IN");
    fs.mkdirSync(config.projectRootDir, { recursive: true });
    fs.writeFileSync(`${config.projectRootDir}/create-node-mrc.json`, JSON.stringify(config, null, 2));
    colormsg("success", "Done Creating project folder...", "OUT");
}

async function initializeGitRepository(config) {
    colormsg("info", "Initializing git repository...", "IN");
    await exec(`cd ${config.projectRootDir}; git init; echo node_modules > .gitignore`).then(() => {
        colormsg("success", "Done Initializing git repository...", "OUT");
    }).catch(error => {
        terminateNode('Git is not installed. Repository not created')
    })
}

async function initializeNodeApp(config) {
    colormsg("info", "Initializing node app");
    await exec(`cd ${config.projectRootDir}; npm init -y`);
    colormsg("success", "Successfully initialized node app");

    var platform = require("os").platform();

    if (platform === "win32") {
        colormsg("primary", "Coming soon");
        return terminateNode('Windows Platform support coming soon')
    }
    colormsg("info", "Copying necessary template files");
    const { join } = require("path");
    let templateFiles = join(__dirname, "../../dist/Template/*")
    await exec(`
        cd ${config.projectRootDir};
        cp ${templateFiles} ./ -r ;
        echo "# ${config.projectName.toUpperCase()} API \n\n\n### Template Created By create-node-mrc " > README.md ;
        touch .env`);
    colormsg("success", "Successfully initialized template files");
    colormsg("info", "Installing Dependencies", "IN");

    await installDependency({ packageName: "express", projectRootDir: config.projectRootDir });
    await installDependency({ packageName: "mongoose", projectRootDir: config.projectRootDir });
    await installDependency({ packageName: "cors", projectRootDir: config.projectRootDir });
    await installDependency({ packageName: "dotenv", projectRootDir: config.projectRootDir });
    await installDependency({ packageName: "morgan", projectRootDir: config.projectRootDir });

    for (const dependency of config.dependencies) {
        await installDependency({ packageName: dependency, projectRootDir: config.projectRootDir });
    }

    colormsg("success", "Done Installing Dependencies", "OUT");

    colormsg("success", "Happy Hacking !!!", "OUT");
    // await exec(`cd ${config.projectRootDir}; code .`);

}
// /home/dae54/Projects
