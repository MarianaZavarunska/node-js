const url = require('url');

const users = require('../db/users');

function isValidUser(req, res, next) {
    try {
        let index = users.findIndex(
            (user) => user.email === req.body.email.toLowerCase()
        );

        if (index !== -1) {
            throw new Error('Login has already existed!');
        }

        if (req.body.password.length < 3) {
            throw new Error('Password should consist more than 3 chars!');
        }

        next();

    } catch (error) {
        let err = encodeURIComponent(error.message);

        res.redirect("/errEmail" + '?err=' + err);

    }
}

module.exports = isValidUser;