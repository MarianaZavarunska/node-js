const { Router } = require("express");
const users = require("../db/users");
const deleteUserController = require("../controllers/delete.controller");

const deleteUserRouter = Router();

deleteUserRouter.post("/:userId", deleteUserController.deleteUserById);


module.exports = deleteUserRouter;