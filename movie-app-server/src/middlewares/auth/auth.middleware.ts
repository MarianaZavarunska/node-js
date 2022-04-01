import { NextFunction, Response } from 'express';

import { IRequestExtended } from '../../interfaces';
import { ErrorHandler } from '../../error/error.handler';
import { tokenService, userService } from '../../services';
import { tokenRepository } from '../../repositories/token/token.repository';
import { actionTokenRepository } from '../../repositories/actionToken/actionToken.repository';

class AuthMiddleware {
    public async checkAccessToken(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const accessToken = req.get('Authorization');

            if (!accessToken) {
                next(new ErrorHandler('No token'));
                return;
            }
            const { userEmail } = await tokenService.verifyToken(accessToken);

            const userFromToken = await userService.getUserByEmail(userEmail);

            if (!userFromToken) {
                next(new ErrorHandler('Token is not valid', 401));
                return;
            }

            req.user = userFromToken;
            next();
        } catch (e) {
            next(e);
        }
    }

    public async checkRefreshToken(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const refreshToken = req.get('Authorization');

            if (!refreshToken) {
                next(new ErrorHandler('No token'));
                return;
            }
            const { userEmail } = await tokenService.verifyToken(refreshToken, 'refresh');

            const tokenPairFromDB = await tokenRepository.findTokenByParams({ refreshToken });

            if (!tokenPairFromDB) {
                next(new ErrorHandler('Token is not valid', 401));
                return;
            }

            const userFromToken = await userService.getUserByEmail(userEmail);

            if (!userFromToken) {
                next(new ErrorHandler('Token is not valid', 401));
                return;
            }

            req.user = userFromToken;
            next();
        } catch (e) {
            next(e);
        }
    }

    public async checkActionToken(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const actionToken = req.get('Authorization');

            if (!actionToken) {
                next(new ErrorHandler('No token'));
                return;
            }

            const { userEmail } = await tokenService.verifyToken(actionToken, 'action');

            const tokenFromDB = await actionTokenRepository.findTokenByParams({ actionToken });

            if (!tokenFromDB) {
                next(new ErrorHandler('Token is not valid', 401));
                return;
            }

            const userFromToken = await userService.getUserByEmail(userEmail);

            if (!userFromToken) {
                next(new ErrorHandler('Token is not valid', 401));
                return;
            }

            req.user = userFromToken;
            next();
        } catch (e) {
            next(e);
        }
    }
}

export const authMiddleware = new AuthMiddleware();
