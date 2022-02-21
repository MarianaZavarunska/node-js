// const users = require("../db/users");

const usersService = require('../services/users.services');

async function isValidSignInData(req, res, next) {
    try {
        let users = await usersService.readFile();

        let index = users.findIndex(
            (user) =>

                user.email === req.body.email
                && user.password === req.body.password
        );

        if (index === -1) {
            console.log('User not found');
            throw new Error('Your email or password is invalid!');
        }
        req.index = index;

        next();

    } catch (error) {

        let err = encodeURIComponent(error.message);

        res.redirect('/errEmail' + '?err=' + err);
    }

}

module.exports = isValidSignInData;

