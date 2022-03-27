const usersService = require('../services/users.services');

class loginController {

    renderAddUser(_, res) {

        res.render('login');
    }

    async addNewUser(req, res) {

        let users = await usersService.readFile();

        req.body['id'] = new Date().getTime();
        users.push(req.body);
        await usersService.overWriteFile(users);
        res.redirect('/users');
    }


}

module.exports = new loginController();