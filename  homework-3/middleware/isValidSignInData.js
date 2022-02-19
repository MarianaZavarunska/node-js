const users = require("../db/users");

function isValidSignInData(req, res, next) {
    try {
        let index = users.findIndex(
            (user) =>

                user.email === req.body.email.toLowerCase()
                && user.password === req.body.password.toLowerCase()
        );

        if (index === -1) {
            console.log('User not found');
            throw new Error("Your email or password is invalid!");
        }
        req.index = index;

        next();

    } catch (error) {
        console.log(error);
        res.status(400).send(error.message);
    }

}

module.exports = isValidSignInData;

