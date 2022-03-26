import { NextFunction, Response } from 'express';
import { ErrorHandler } from '../error/error.handler';
import { IRequestExtended } from '../interfaces/request.interface';
import { tokenRepository } from '../repositories/token/tokenRepository';
import { tokenService } from '../services/tokenService';
import { userService } from '../services/userService';

class AuthMiddleware {
    public async checkAccessToken(req: IRequestExtended, res:Response, next: NextFunction) {
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

    public async checkRefreshToken(req: IRequestExtended, res:Response, next: NextFunction) {
        try {
            const refreshToken = req.get('Authorization');

            if (!refreshToken) {
                next(new ErrorHandler('No token'));
                return;
            }

            const { userEmail } = await tokenService.verifyToken(refreshToken, 'refresh');

            const tokenPairFromDB = await tokenRepository.findTokenUserByParams({ refreshToken });

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
}

export const authMiddleware = new AuthMiddleware();
