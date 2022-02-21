const usersService = require('../services/users.services');

async function isValidUser(req, res, next) {
    try {
        let users = await usersService.readFile();

        let index = users.findIndex(
            (user) => user.email === req.body.email.toLowerCase()
        );

        if (index !== -1) throw new Error('Login has already existed!');

        if (req.body.password.length < 3) throw new Error('Password should consist more than 3 chars!');

        if (!req.body.email || !req.body.email.includes('@')) throw new Error('Incorrect email');

        next();

    } catch (error) {
        let err = encodeURIComponent(error.message);

        res.redirect('/errEmail' + '?err=' + err);

    }
}

module.exports = isValidUser;