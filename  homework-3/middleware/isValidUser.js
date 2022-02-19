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
        console.log(error);
        res.status(400).send(error.message);
        // res.status(400).render("errEmail");
    }


}

module.exports = isValidUser;