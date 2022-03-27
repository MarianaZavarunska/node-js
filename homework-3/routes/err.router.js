const { Router } = require('express');

const errorController = require("../controllers/error.controller");

const errRouter = Router();

errRouter.get('/', errorController.renderErrPage);

module.exports = errRouter;