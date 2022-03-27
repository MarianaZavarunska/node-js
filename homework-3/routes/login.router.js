const { Router } = require("express");
const loginController = require("../controllers/login.controller");
const loginMiddleware = require("../middlewares/isValidUser");

const loginRouter = Router();

loginRouter.get("/", loginController.renderAddUser);
loginRouter.post("/", loginMiddleware, loginController.addNewUser);


module.exports = loginRouter;