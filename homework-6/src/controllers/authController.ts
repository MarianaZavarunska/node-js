import { Request, Response } from 'express';

import { authService } from '../services/authService';
import { ITokenData } from '../interfaces/token.interface';
import { COOKIE } from '../constans/cookie';
import { tokenService } from '../services/tokenService';

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

    public async logout(req: Request, res: Response): Promise<Response<string>> {
        res.clearCookie(COOKIE.nameRefreshToken);
        await tokenService.deleteTokenPair(3);

        return res.json('ok');
    }
}

export const authController = new AuthController();
