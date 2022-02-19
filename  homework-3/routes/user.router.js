const { Router } = require("express");
const userController = require("../controllers/user.controller");

const userRouter = Router();

userRouter.get('/', userController.renderUsers);
userRouter.post("/", userController.filterUsers);
userRouter.get("/:userId", userController.getUserById);

module.exports = userRouter;