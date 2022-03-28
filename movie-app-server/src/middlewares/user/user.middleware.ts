import { NextFunction, Response } from 'express';
import { ErrorHandler } from '../../error/error.handler';

import { IRequestExtended } from '../../interfaces';
import { userService } from '../../services';

class UserMiddleware {
    public async checkIfUserExists(req: IRequestExtended, res:Response, next: NextFunction) {
        try {
            const userFromDB = await userService.getUserByEmail(req.body.email);

            if (!userFromDB) {
                next(new ErrorHandler('Wrong email or password', 401));
                return;
            }
            req.user = userFromDB;
            next();
        } catch (e) {
            next(e);
        }
    }
}

export const userMiddleware = new UserMiddleware();
