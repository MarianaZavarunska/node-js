import { Response, NextFunction } from 'express';

import { IRequestExtended } from '../interfaces';
import { userRepository } from '../repositories/user/userRepository';
import { userValidator } from '../validators/user.validators';
import { ErrorHandler } from '../error/error.handler';

class UserMiddleware {
    async checkIfUserExists(
        req: IRequestExtended,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const userFromDB = await userRepository.getUserByEmail(req.body.email);

            if (!userFromDB) {
                next(new ErrorHandler('wrong email or password', 401));
                return;
            }
            next();
        } catch (e) {
            next(e);
        }
    }

    // Validators

    async validateCreateUser(
        req: IRequestExtended,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const { error, value } = await userValidator.createUser.validate(
                req.body,
            );

            if (error) {
                next(new ErrorHandler(error.details[0].message));
                return;
            }
            req.user = value;
            next();
        } catch (e) {
            next(e);
        }
    }

    async validateLoginUser(
        req: IRequestExtended,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const { error, value } = await userValidator.login.validate(req.body);

            if (error) {
                next(new ErrorHandler('Email or password is wrong', 401));
                return;
            }
            req.user = value;
            next();
        } catch (e) {
            next(e);
        }
    }

    async validateUpadateUser(
        req: IRequestExtended,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const { error, value } = await userValidator.update.validate(req.body);

            if (error) {
                next(new ErrorHandler(error.details[0].message));
                return;
            }
            req.user = value;
            next();
        } catch (e) {
            next(e);
        }
    }
}

export const userMiddleware = new UserMiddleware();
