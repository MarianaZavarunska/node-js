import { NextFunction, Response } from 'express';

import {
    authService,
    emailService,
    s3service,
    tokenService,
    userService,
} from '../services';
import { COOKIE } from '../constants/cookie';
import { IRequestExtended, IUserEntity } from '../interfaces';
import { tokenRepository } from '../repositories/token/token.repository';
import { ActionTokenTypes, EmailTypeEnum } from '../enums/enums';
import { actionTokenRepository } from '../repositories/actionToken/actionToken.repository';
import { constants } from '../constants/constants';
import { ErrorHandler } from '../error/error.handler';

class AuthController {
    public async registration(
        req: IRequestExtended,
        res: Response,
        next: NextFunction,
    ): Promise<void> {
        try {
            const { firstName, email } = req.body;

            const userFromDB = await userService.getUserByEmail(email);

            if (userFromDB) {
                next(new ErrorHandler(`User with:  ${email} email already exists`));
                return;
            }

            const createdUser = await userService.creteUser(req.body);

            // Upload photo or video

            const photo = Array.isArray(req.photos) ? req.photos[0] : req.photos;
            const video = Array.isArray(req.videos) ? req.videos[0] : req.videos;

            if (photo) {
                const sendDate = await s3service.uploadFile(
                    photo,
                    'user',
                    createdUser.id,
                );
                createdUser.avatar = sendDate.Location;
            }

            if (video) {
                const sendVideo = await s3service.uploadFile(
                    video,
                    'user',
                    createdUser.id,
                );

                console.log('====LOCATION====');
                console.log(sendVideo.Location);
                console.log('====LOCATION====');
            }

            // Update user
            await userService.updateUserAvatar(createdUser);

            const tokenData = await authService.registration(createdUser);

            // const data = await authService.registration(req.body);
            // const { firstName, email } = req.body;
            //
            // res.cookie(
            //     COOKIE.nameRefreshToken,
            //     data.refreshToken,
            //     { maxAge: COOKIE.maxAgeRefreshToken, httpOnly: true },
            // );

            await emailService.sendEmailGeneric(
                email,
                { firstName, template: 'email' },
                EmailTypeEnum.WELCOME,
            );
            res.json(tokenData);
            next();
        } catch (e) {
            next(e);
        }
    }

    public async login(
        req: IRequestExtended,
        res: Response,
        next: NextFunction,
    ): Promise<void | Error> {
        try {
            const {
                id,
                firstName,
                email,
                password: hashedPassword,
            } = req.user as IUserEntity;

            const { password } = req.body;

            const { accessToken, refreshToken } = await tokenService.generateTokenPair({ userId: id, userEmail: email });

            await userService.compareUserPasswords(password, hashedPassword);

            await tokenRepository.createToken({
                refreshToken,
                accessToken,
                userId: id,
            });

            // await emailService.sendEmailGeneric(email, { firstName, template: 'email' }, ActionTokenTypes.FORGOT_PASSWORD);
            await emailService.sendEmailHBS(email, firstName, EmailTypeEnum.WELCOME);

            res.json({
                accessToken,
                refreshToken,
                user: req.user,
            });
        } catch (e: any) {
            next(e);
        }
    }

    public async logout(
        req: IRequestExtended,
        res: Response,
    ): Promise<Response<string>> {
        const { id, firstName, email } = req.user as IUserEntity;

        res.clearCookie(COOKIE.nameRefreshToken);
        await tokenRepository.deleteTokenByParams({ userId: id });

        await emailService.sendEmailGeneric(
            email,
            { firstName, template: 'email' },
            EmailTypeEnum.FAREWALL,
        );

        return res.json('ok');
    }

    public async refreshToken(
        req: IRequestExtended,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const { id, email } = req.user as IUserEntity;
            const currentRefreshToken = req.get('Authorization');

            await tokenService.deleteTokenPairByParams({
                refreshToken: currentRefreshToken,
            });

            const { accessToken, refreshToken } = await tokenService.generateTokenPair({
                userId: id,
                userEmail: email,
            });

            await tokenRepository.createToken({
                accessToken,
                refreshToken,
                userId: id,
            });

            res.json({
                accessToken,
                refreshToken,
                user: req.user,
            });
        } catch (e) {
            next(e);
        }
    }

    public async sendForgotPassword(
        req: IRequestExtended,
        res: Response,
        next: NextFunction,
    ) {
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

            await emailService.sendEmailGeneric(
                email,
                {
                    firstName,
                    frontUrl: `${constants.FRONTEND_URL}?actionToken=${actionToken}`,
                    template: 'forgotPassword',
                },
                EmailTypeEnum.FORGOT_PASSWORD,
            );

            res.sendStatus(204);
        } catch (e) {
            next(e);
        }
    }

    public async setPassword(
        req: IRequestExtended,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const actionToken = req.get('Authorization');

            const { id, firstName, email } = req.user as IUserEntity;

            await userService.updateUser(id, req.body);

            await actionTokenRepository.deleteByParams({ actionToken });

            await emailService.sendEmailGeneric(
                email,
                { firstName, template: 'email' },
                EmailTypeEnum.RECOVER_PASSWORD,
            );

            res.sendStatus(201);
        } catch (e) {
            next(e);
        }
    }
}

export const authController = new AuthController();
