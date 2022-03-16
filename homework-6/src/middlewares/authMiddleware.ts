import { NextFunction, Response } from 'express';
import { IRequestExtended } from '../interfaces/request.interface';
import { tokenService } from '../services/tokenService';
import { userService } from '../services/userService';

class AuthMiddleware {
    public async checkAccessToken(req: IRequestExtended, res:Response, next: NextFunction) {
        try {
            const authToken = req.get('Authorization');

            if (!authToken) {
                throw new Error('No token');
            }

            const { userEmail } = await tokenService.verifyToken(authToken);

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
