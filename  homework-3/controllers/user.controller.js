const users = require("../db/users");

class userController {
    renderUsers(req, res) {
        res.render('users', { users });
    }

    filterUsers(req, res) {
        let filteredUsers = users;

        if (req.body.ageFilter) {
            filteredUsers = filteredUsers.filter(user => user.age === req.body.ageFilter);
        }
        if (req.body.cityFilter) {
            filteredUsers = filteredUsers.filter(user => user.city.toLowerCase() === req.body.cityFilter.toLowerCase());
        }
        res.render("users", { 'users': filteredUsers, 'ageFilter': req.body.ageFilter, 'cityFilter': req.body.cityFilter });
    }

    getUserById(req, res) {

        const { userId } = req.params;
        let index = users.findIndex((user) => user.id === +userId);

        res.render("userDetails", { user: users[index] });
    }

}

module.exports = new userController();