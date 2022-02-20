const { Router } = require("express");

const userRouter = require("./user.router");
const loginRouter = require("./login.router");
const signInRouter = require("./signIn.router");
const errRouter = require('./err.router');


const routes = Router();

routes.get("/", (_, res) => {
    res.render("home");
});
routes.use("/users", userRouter);
routes.use("/login", loginRouter);
routes.use("/signIn", signInRouter);
routes.use("/errEmail", errRouter);

routes.use((_, res) => {
    res.render("notFoundPage");
});

module.exports = routes;