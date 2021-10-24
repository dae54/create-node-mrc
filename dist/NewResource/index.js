#!/usr/bin/env node
const { writeFile } = require("fs").promises;
const { existsSync, mkdirSync } = require("fs");
const { colormsg, exec } = require("../../lib/common");

const {
  generateBaseController,
  generateBaseModel,
  generateBaseRoutes,
} = require("./script");

(function () {
  let resourceName = process.argv.splice(2)[0];
  if (!resourceName) {
    colormsg("danger", "Resource name argument missing.", "OUT");
    colormsg("danger", "Terminating script...", "OUT");
    return process.exit(0);
  }
  if (!existsSync(resourceName)) {
    colormsg("info", "Creating resource folder...", "IN");
    mkdirSync(resourceName);
    colormsg("success", "Resource folder created...", "OUT");
    colormsg("info", "Creating resources files...", "IN");

    writeFile(
      `${resourceName}/${resourceName}.controller.js`,
      generateBaseController(resourceName),
      {
        encoding: "utf-8",
      }
    );
    writeFile(
      `${resourceName}/${resourceName}.model.js`,
      generateBaseModel(resourceName),
      {
        encoding: "utf-8",
      }
    );
    writeFile(
      `${resourceName}/${resourceName}.routes.js`,
      generateBaseRoutes(resourceName),
      {
        encoding: "utf-8",
      }
    );

    // COMMIT NEW ADDITION
    var isGitDir = execSync('git rev-parse --is-inside-work-tree 2>/dev/null', { encoding: 'utf8' });

    if (isGitDir) {
      colormsg("info", "Commit and add resource to git, 'Project_name'", "IN");
      await exec(`git add . ; git commit -m "create resource ${resourceName} by 'create-node-mrc'" ${packageName}`);
      colormsg("success", "Done committing and addding resource to git", "OUT");
    }

    colormsg(
      "success",
      `Resource Successfully Created at ${new Date(Date.now())} `,
      "OUT"
    );
  } else {
    colormsg(
      "warning",
      `Folder or File named ${resourceName} already exists. Delete it to proceed, or change resource name...`,
      "OUT"
    );
    colormsg("danger", "Terminating script...", "OUT");
    process.exit(0);
  }
})();
