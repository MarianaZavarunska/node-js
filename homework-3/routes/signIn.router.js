const { Router } = require("express");
const signInController = require("../controllers/signIn.controller");
const isValidSignInData = require("../middlewares/isValidSignInData");

const signInRouter = Router();

signInRouter.get("/", signInController.renderForm);

signInRouter.post("/", isValidSignInData, signInController.showUser);

module.exports = signInRouter;

