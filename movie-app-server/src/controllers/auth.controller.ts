import { Request, Response } from 'express';

import { authService, tokenService, userService } from '../services';
import { COOKIE } from '../constants/cookie';
import { IRequestExtended, IUserEntity, ITokenData } from '../interfaces';
import { tokenRepository } from '../repositories/token/token.repository';

class AuthController {
    public async registration(req:Request, res:Response): Promise<Response<ITokenData>> {
        const data = await authService.registration(req.body);

        res.cookie(
            COOKIE.nameRefreshToken,
            data.refreshToken,
            { maxAge: COOKIE.maxAgeRefreshToken, httpOnly: true },
        );
        return res.json(data);
    }

    public async login(req: IRequestExtended, res: Response): Promise<void | Error> {
        try {
            const { id, email, password: hashedPassword } = req.user as IUserEntity;
            const { password } = req.body;

            const { accessToken, refreshToken } = await tokenService.generateTokenPair({ userId: id, userEmail: email });

            await userService.compareUserPasswords(password, hashedPassword);

            await tokenRepository.createToken({ refreshToken, accessToken, userId: id });

            res.json({
                accessToken,
                refreshToken,
                user: req.user,
            });
        } catch (e:any) {
            res.status(404).json(e.message);
        }
    }

    public async logout(req:IRequestExtended, res: Response): Promise<Response<string>> {
        const { id } = req.user as IUserEntity;

        res.clearCookie(COOKIE.nameRefreshToken);
        await tokenRepository.deleteTokenByParams({ userId: id });

        return res.json('ok');
    }

    public async refreshToken(req: IRequestExtended, res: Response) {
        try {
            const { id, email } = req.user as IUserEntity;
            const currentRefreshToken = req.get('Authorization');

            await tokenService.deleteTokenPairByParams({ refreshToken: currentRefreshToken });

            const { accessToken, refreshToken } = await tokenService.generateTokenPair({
                userId: id,
                userEmail: email,
            });

            await tokenRepository.createToken({ accessToken, refreshToken, userId: id });

            res.json({
                accessToken,
                refreshToken,
                user: req.user,
            });
        } catch (e) {
            res.status(404).json(e);
        }
    }
}

export const authController = new AuthController();
