#!/usr/bin/env node

(async function () {
    const fs = require("fs");
    const { colormsg, installDependency, exec } = require("../lib/common");

    let project_name = process.argv.splice(2)[0];
    // let project = process.argv.splice(2)[0];
    // console.log(project_name)
    // console.log(project)
    // npx create-node-mrc [appname]
    // if (!project_name) {
    //   colormsg("warning", "Missing required argument, 'Project_name'", "IN");
    //   colormsg("danger", "Please add it to proceed. happy hacking");
    //   return process.exit(1);
    // }

    // if (fs.existsSync(project_name)) {
    //   colormsg(
    //     "warning",
    //     "Folder already exists. Change the file name and proceed",
    //     "IN"
    //   );
    //   colormsg("danger", "Terminating Script.", "OUT");
    //   return process.exit(1);
    // }

    // if (!fs.existsSync(project_name)) {
    //   colormsg("info", "Creating project folder...", "IN");
    //   fs.mkdirSync(project_name);
    //   colormsg("success", "Done Creating project folder...", "OUT");
    //   colormsg("info", "Initializing git repository...", "IN");

    //   await exec(`cd ${project_name}; git init`).then(() => {
    //     colormsg("success", "Done Initializing git repository...", "OUT");
    //   }).catch(error => {
    //     colormsg("warning", "Git is not installed. Repository not created, 'Project_name'", "OUT");
    //   })
    // }

    // try {
    //   await exec(`cd ${project_name}; npm init -y`);
    //   // colormsg("s  uccess", "Successfully generated package.json");

    //   var platform = require("os").platform();

    //   if (platform === "win32") {
    //     colormsg("primary", "Coming soon");
    //     return process.exit(1);
    //   } else {
    //     colormsg("info", "Copying template files");
    //     const { join } = require("path");
    //     await exec(`
    //       cd ${project_name};
    //       cp ${join(__dirname, "../dist/Template/*")} ./ -r ;
    //       echo "# ${project_name.toUpperCase()} API \n\n\n### Template Created By create-node-mrc " > README.md ;
    //       touch .env
    //       `);
    //     colormsg("success", "Successfully initialized template files");
    //   }

    //   colormsg("info", "Installing Dependencies", "IN");

    //   await installDependency({ packageName: "express", project_name });
    //   await installDependency({ packageName: "mongoose", project_name });
    //   await installDependency({ packageName: "cors", project_name });
    //   await installDependency({ packageName: "dotenv", project_name });
    //   await installDependency({ packageName: "morgan", project_name });

    //   colormsg("success", "Done Installing Dependencies", "OUT");
    //   colormsg("success", "Happy Hacking !!!", "OUT");
    // } catch (error) {
    //   console.log(error);
    // }
})();



  // npx create-node-mrc -R users