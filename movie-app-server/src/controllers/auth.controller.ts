import { NextFunction, Request, Response } from 'express';

import {
    authService, emailService, tokenService, userService,
} from '../services';
import { COOKIE } from '../constants/cookie';
import { IRequestExtended, ITokenData, IUserEntity } from '../interfaces';
import { tokenRepository } from '../repositories/token/token.repository';
import { ActionTokenTypes, EmailTypeEnum } from '../enums/enums';
import { actionTokenRepository } from '../repositories/actionToken/actionToken.repository';
import { constants } from '../constants/constants';

class AuthController {
    public async registration(req: Request, res: Response): Promise<Response<ITokenData>> {
        const data = await authService.registration(req.body);
        const { firstName, email } = req.body;

        res.cookie(
            COOKIE.nameRefreshToken,
            data.refreshToken,
            { maxAge: COOKIE.maxAgeRefreshToken, httpOnly: true },
        );
        await emailService.sendEmail(email, { firstName }, EmailTypeEnum.WELCOME);
        return res.json(data);
    }

    public async login(req: IRequestExtended, res: Response, next: NextFunction): Promise<void | Error> {
        try {
            const {
                id, firstName, email, password: hashedPassword,
            } = req.user as IUserEntity;

            const { password } = req.body;

            const { accessToken, refreshToken } = await tokenService.generateTokenPair({ userId: id, userEmail: email });

            await userService.compareUserPasswords(password, hashedPassword);

            await tokenRepository.createToken({ refreshToken, accessToken, userId: id });

            await emailService.sendEmail(email, { firstName }, ActionTokenTypes.FORGOT_PASSWORD);

            res.json({
                accessToken,
                refreshToken,
                user: req.user,
            });
        } catch (e: any) {
            next(e);
        }
    }

    public async logout(req: IRequestExtended, res: Response): Promise<Response<string>> {
        const { id, firstName, email } = req.user as IUserEntity;

        res.clearCookie(COOKIE.nameRefreshToken);
        await tokenRepository.deleteTokenByParams({ userId: id });

        await emailService.sendEmail(email, { firstName }, EmailTypeEnum.FAREWALL);

        return res.json('ok');
    }

    public async refreshToken(req: IRequestExtended, res: Response, next: NextFunction) {
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
            next(e);
        }
    }

    public async sendForgotPassword(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const { id, email, firstName } = req.user as IUserEntity;

            const actionToken = tokenService.generateActionToken({
                userId: id,
                userEmail: email,
            });
            await actionTokenRepository.createActionToken({
                actionToken,
                type: ActionTokenTypes.FORGOT_PASSWORD,
                userId: id,
            });

            await emailService.sendRecoveryEmail(
                email,
                actionToken,
                { firstName, frontUrl: constants.FRONTEND_URL },
                EmailTypeEnum.FORGOT_PASSWORD,
            );

            res.sendStatus(204);
        } catch (e) {
            next(e);
        }
    }

    public async setPassword(req:IRequestExtended, res: Response, next: NextFunction) {
        try {
            const actionToken = req.get('Authorization');

            const { id, firstName, email } = req.user as IUserEntity;

            await userService.updateUser(id, req.body);

            await actionTokenRepository.deleteByParams({ actionToken });

            await emailService.sendEmail(
                email,
                { firstName },
                EmailTypeEnum.RECOVER_PASSWORD,
            );

            res.sendStatus(201);
        } catch (e) {
            next(e);
        }
    }
}

export const authController = new AuthController();
