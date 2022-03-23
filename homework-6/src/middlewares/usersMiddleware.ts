import { Response, NextFunction } from 'express';

import { IRequestExtended } from '../interfaces';
import { userRepository } from '../repositories/user/userRepository';
import { userValidator } from '../validators/user.validators';

class UserMiddleware {
    async checkIfUserExists(req:IRequestExtended, res:Response, next: NextFunction) {
        try {
            const userFromDB = await userRepository.getUserByEmail(req.body.email);

            if (!userFromDB) {
                throw new Error('wrong email or password');
            }
            req.user = userFromDB;
            next();
        } catch (e:any) {
            res.status(400).json(e.message);
        }
    }

    async validateCreateUser(req:IRequestExtended, res:Response, next: NextFunction) {
        try {
            const { error, value } = await userValidator.createUser.validate(req.body);

            if (error) {
                throw new Error(error.details[0].message);
            }
            req.user = value;
            next();
        } catch (e:any) {
            res.status(400).json(e.message);
        }
    }

    async validateLoginUser(req:IRequestExtended, res:Response, next: NextFunction) {
        try {
            const { error, value } = await userValidator.login.validate(req.body);

            if (error) {
                throw new Error('Email or password is wrong');
            }
            req.user = value;
            next();
        } catch (e:any) {
            res.status(400).json(e.message);
        }
    }

    async validateUpadateUser(req:IRequestExtended, res:Response, next: NextFunction) {
        try {
            const { error, value } = await userValidator.update.validate(req.body);

            if (error) {
                throw new Error(error.details[0].message);
            }
            req.user = value;
            next();
        } catch (e:any) {
            res.status(400).json(e.message);
        }
    }
}

export const userMiddleware = new UserMiddleware();
