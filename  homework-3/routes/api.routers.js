const { Router } = require("express");
const userRouter = require("./user.router");
const loginRouter = require("./login.router");
const signInRouter = require("./signIn.router");
const deleteUserRouter = require("./delete.router");

const routes = Router();

routes.get("/", (_, res) => {
    res.render("home");
});
routes.use("/users", userRouter);
routes.use("/login", loginRouter);
routes.use("/signIn", signInRouter);
routes.use("/deleteUser", deleteUserRouter);
routes.get("/errEmail", (_, res) => {
    res.render("errEmail");
});
routes.use((_, res) => {
    res.render("notFoundPage");
});

module.exports = routes;