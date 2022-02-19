const users = require("../db/users");

class signInController {
    renderForm(_, res) {
        res.render("signIn");
    }

    showUser(req, res) {
        res.render("userDetails", { user: users[req.index] });
    }
}

module.exports = new signInController();