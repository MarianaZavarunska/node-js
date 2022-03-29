import { NextFunction, Response } from 'express';
import { IRequestExtended } from '../../interfaces';

import { authValidator } from '../../validators/auth.validator';
import { ErrorHandler } from '../../error/error.handler';

class AuthValidationMiddleware {
    public async validateRegisterUser(req: IRequestExtended, res: Response, next:NextFunction) {
        try {
            const { error, value } = await authValidator.register.validate(req.body);
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

    public async validateLoginUser(req: IRequestExtended, res: Response, next:NextFunction) {
        try {
            const { error, value } = await authValidator.login.validate(req.body);
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

export const authValidationMiddleware = new AuthValidationMiddleware();
