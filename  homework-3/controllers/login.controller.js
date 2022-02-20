const users = require("../db/users");

class loginConroller {

    renderAddUser(_, res) {

        res.render("login");
    }

    addNewUser(req, res) {

        req.body['id'] = new Date().getTime();
        users.push(req.body);
        res.redirect("/users");
    }


}

module.exports = new loginConroller();