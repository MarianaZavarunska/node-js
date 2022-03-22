import { NextFunction, Response } from 'express';
import { IRequestExtended } from '../interfaces/request.interface';
import { tokenRepository } from '../repositories/token/tokenRepository';
import { tokenService } from '../services/tokenService';
import { userService } from '../services/userService';

class AuthMiddleware {
    public async checkAccessToken(req: IRequestExtended, res:Response, next: NextFunction) {
        try {
            const accessToken = req.get('Authorization');

            if (!accessToken) {
                throw new Error('No token');
            }

            const { userEmail } = await tokenService.verifyToken(accessToken);

            const userFromToken = await userService.getUserByEmail(userEmail);

            if (!userFromToken) {
                throw new Error('Wrong Token');
            }

            req.user = userFromToken;

            next();
        } catch (e: any) {
            res.json({
                status: 400,
                message: e.message,
            });
        }
    }

    public async checkRefreshToken(req: IRequestExtended, res:Response, next: NextFunction) {
        try {
            const refreshToken = req.get('Authorization');

            if (!refreshToken) {
                throw new Error('No token');
            }

            const { userEmail } = await tokenService.verifyToken(refreshToken, 'refresh');

            const tokenPairFromDB = await tokenRepository.findTokenUserByParams({ refreshToken });

            if (!tokenPairFromDB) {
                throw new Error('Wrong Token');
            }

            const userFromToken = await userService.getUserByEmail(userEmail);

            if (!userFromToken) {
                throw new Error('Wrong Token');
            }

            req.user = userFromToken;

            next();
        } catch (e: any) {
            res.json({
                status: 400,
                message: e.message,
            });
        }
    }
}

export const authMiddleware = new AuthMiddleware();
