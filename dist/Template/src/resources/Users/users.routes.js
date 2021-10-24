const Router = require("express");

const router = new Router();
const userController = require("./users.controller");
const sessionMonitor = require("../../utils/sessionMonitor");

router.get("/:id", sessionMonitor, userController.getById);
router.get("/", userController.getAll);
router.post("/login", userController.login);
router.post("/signout", sessionMonitor, userController.signOut);
router.post("/register", sessionMonitor, userController.registerUser);
router.patch("/resetPassword", sessionMonitor, userController.resetPassword);
router.put("/update/:userId", sessionMonitor, userController.updateUser);
router.delete("/:userId", sessionMonitor, userController.deleteUser);

module.exports = router;
