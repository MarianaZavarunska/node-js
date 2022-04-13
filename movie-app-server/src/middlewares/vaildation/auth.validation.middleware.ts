import { NextFunction, Response } from 'express';
import { IRequestExtended } from '../../interfaces';

import { authValidator } from '../../validators/auth.validator';
import { ErrorHandler } from '../../error/error.handler';

class AuthValidationMiddleware {
    public async validateRegisterUser(
        req: IRequestExtended,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const { error, value } = await authValidator.register.validate(req.body);
            if (error) {
                next(new ErrorHandler(error.details[0].message));
                return;
            }
            req.body = value;
            next();
        } catch (e) {
            next(e);
        }
    }

    public async validateLoginUser(
        req: IRequestExtended,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const { error, value } = await authValidator.login.validate(req.body);
            if (error) {
                next(new ErrorHandler(error.details[0].message));
                return;
            }
            req.body = value;
            next();
        } catch (e) {
            next(e);
        }
    }

    public async checkValidEmail(
        req: IRequestExtended,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const { error, value } = await authValidator.email.validate(req.body);
            if (error) {
                next(new ErrorHandler(error.details[0].message));
                return;
            }
            req.body = value;
            next();
        } catch (e) {
            next(e);
        }
    }

    public async checkValidPassword(
        req: IRequestExtended,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const { error, value } = await authValidator.password.validate(req.body);
            if (error) {
                next(new ErrorHandler(error.details[0].message));
                return;
            }
            req.body = value;
            next();
        } catch (e) {
            next(e);
        }
    }
}

export const authValidationMiddleware = new AuthValidationMiddleware();
