const exec = require("util").promisify(require("child_process").exec);

module.exports = {
  exec,
  /**
   *
   * @param {String} dest IN, OUT; colors to be displayed
   * @param {String} consoleColor primary, info, warning, danger, dark, success; colors to be displayed
   * @param {String} message The message to be logged
   * @example colormsg('info','Hello world')
   */
  colormsg: (consoleColor, message, dest = "OUT") => {
    let color = "\x1b[33m%s\x1b[0m";

    switch (consoleColor) {
      case "dark":
        color = "\x1b[30m%s\x1b[0m";
        break;
      case "danger":
        color = "\x1b[31m%s\x1b[0m";
        break;
      case "success":
        color = "\x1b[32m%s\x1b[0m";
        break;
      case "warning":
        color = "\x1b[33m%s\x1b[0m";
        break;
      case "primary":
        color = "\x1b[34m%s\x1b[0m";
        break;
      case "info":
        color = "\x1b[36m%s\x1b[0m";
        break;
      case "progress":
        color = "\x1b[35m%s\x1b[0m";
        break;
      default:
        color = "";
    }
    console.log(color, `${dest}: ${message}`);
    return;
  },
  /**
   * Install Dependency
   */
  installDependency: async ({ projectRootDir, packageName }) => {
    module.exports.colormsg("progress", `Installing ${packageName}`, "IN");
    await exec(`cd ${projectRootDir}; npm i ${packageName}`);
    module.exports.colormsg("success", `Done Installing ${packageName}`, "OUT");
  },
  hasCharacter: (s, char) => {
    return s.indexOf(char) >= 0;
  },
  terminateNode: (error) => {
    module.exports.colormsg("danger", error, "OUT");
    return process.exit(1);
  }
};
