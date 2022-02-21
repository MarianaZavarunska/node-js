const usersService = require('../services/users.services');

class signInController {
    renderForm(_, res) {
        res.render('signIn');
    }

    async showUser(req, res) {
        let users = await usersService.readFile();
        res.render('userDetails', {user: users[req.index]});
    }
}

module.exports = new signInController();