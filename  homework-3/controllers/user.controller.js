const usersService = require('../services/users.services');


class userController {
    async renderUsers(req, res) {
        let users = await usersService.readFile();

        res.render('users', {users});

    }

    async filterUsers(req, res) {

        let filteredUsers = await usersService.readFile();

        if (req.body.ageFilter) {
            filteredUsers = filteredUsers.filter(user => user.age === req.body.ageFilter);
        }
        if (req.body.cityFilter) {
            filteredUsers = filteredUsers.filter(user => user.city.toLowerCase() === req.body.cityFilter.toLowerCase());
        }
        res.render('users', {
            'users': filteredUsers,
            'ageFilter': req.body.ageFilter,
            'cityFilter': req.body.cityFilter
        });
    }

    async getUserById(req, res) {
        let users = await usersService.readFile();

        const {userId} = req.params;
        let index = users.findIndex((user) => user.id === +userId);

        res.render('userDetails', {user: users[index]});
    }

    async deleteUserById(req, res) {
        let users = await usersService.readFile();
        const {userId} = req.params;

        let index = users.findIndex(user => user.id === Number(userId));
        users.splice(index, 1);
        await usersService.overWriteFile(users);

        res.redirect('/users');
    }

}

module.exports = new userController();