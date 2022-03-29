import { Response } from 'express';

import { COOKIE } from '../constans/cookie';
import { tokenService } from '../services/tokenService';
import { IRequestExtended } from '../interfaces';
import { IUser } from '../entity/user';
import { tokenRepository } from '../repositories/token/tokenRepository';
import { userService } from '../services/userService';
// import { emailService } from '../email/email.service';
// import { EmailTypeEnum } from '../email';

class AuthController {
    async login(req: IRequestExtended, res: Response) {
        try {
            const { id, email, password: hashedPassword } = req.user as IUser;
            const { password } = req.body;

            const { refreshToken, accessToken } = await tokenService.generateTokenPair({
                userId: id,
                userEmail: email,
            });

            await userService.compareUserPasswords(password, hashedPassword);

            await tokenRepository.createToken({
                refreshToken,
                accessToken,
                userId: id,
            });
            // await emailService.sendEmail(email, EmailTypeEnum.WELCOME);
            res.json({
                refreshToken,
                accessToken,
                user: req.user,
            });
        } catch (e) {
            res.status(404).json(e);
        }
    }

    public async logout(
        req: IRequestExtended,
        res: Response,
    ): Promise<Response<string>> {
        const { id } = req.user as IUser;

        // await emailService.sendEmail(email, EmailTypeEnum.FAREWALL);
        res.clearCookie(COOKIE.nameRefreshToken);
        await tokenService.deleteTokenPair(id);

        return res.json('ok');
    }

    public async refreshToken(req: IRequestExtended, res: Response) {
        try {
            const { id, email } = req.user as IUser;
            const currentRefreshToken = req.get('Authorization');

            await tokenService.deleteTokenPairByParams({
                refreshToken: currentRefreshToken,
            });

            const { accessToken, refreshToken } = await tokenService.generateTokenPair({
                userId: id,
                userEmail: email,
            });

            await tokenRepository.createToken({
                refreshToken,
                accessToken,
                userId: id,
            });

            res.json({
                refreshToken,
                accessToken,
                user: req.user,
            });
        } catch (e) {
            res.status(404).json(e);
        }
    }
}

export const authController = new AuthController();
