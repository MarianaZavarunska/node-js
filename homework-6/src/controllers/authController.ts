import { Request, Response } from 'express';

import { authService } from '../services/authService';
import { ITokenData } from '../interfaces/token.interface';
import { COOKIE } from '../constans/cookie';
import { tokenService } from '../services/tokenService';
import { IRequestExtended } from '../interfaces/request.interface';
import { IUser } from '../entity/user';

class AuthController {
    public async registration(req:Request, res:Response): Promise<Response<ITokenData>> {
        const data = await authService.registration(req.body);
        // write in cookies
        res.cookie(
            'refreshToken',
            COOKIE.nameRefreshToken,
            { maxAge: COOKIE.maxAgeRefreshToken, httpOnly: true },
            // in order to via cookies write some js code
        );
        return res.json(data);
    }

    public async logout(req: IRequestExtended, res: Response): Promise<Response<string>> {
        const { id } = req.user as IUser;

        res.clearCookie(COOKIE.nameRefreshToken);
        await tokenService.deleteTokenPair(id);

        return res.json('ok');
    }
}

export const authController = new AuthController();
