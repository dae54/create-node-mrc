module.exports = {
    generateBaseController: (resourceName) => {
        return `// Customize, add new resources at your confort
const ${resourceName.charAt(0).toUpperCase() + resourceName.substring(1)} = require("./${resourceName}.model");

module.exports = {
    getOne: async (req, res, next) => {
        // GET: Read Single Resources from here
    },
    getAll: async (req, res, next) => {
        // GET: Read ALL Resources from here
    },
    create: async (req, res) => {
        // POST: Create Resources here
    },
    update: async (req, res) => {
        // PATCH: Update Resources here
    },
    // Other controllers
    // ...
};
`;
    },
    generateBaseModel: (resourceName) => {
        return `// Add Schema properties at your confort
const mongoose = require("mongoose");

const ${resourceName}Schema = mongoose.Schema(
    {
        // Set resource properties here...
    },
    { timestamps: true }
);   
module.exports = mongoose.model("${resourceName}", ${resourceName}Schema);
    `;
    },
    generateBaseRoutes: (resourceName) => {
        return `// Add Resource Routes at your confort
const Router = require("express");
const router = new Router();
const ${resourceName}Controller = require("./${resourceName}.controller");
const sessionMonitor = require("../../utils/sessionMonitor");

router.get("/:id", sessionMonitor, ${resourceName}Controller.getOne);
router.get("/", sessionMonitor, ${resourceName}Controller.getAll);
router.post("/", ${resourceName}Controller.create);
router.patch("/", ${resourceName}Controller.update);

module.exports = router;
    `;
    },
};
