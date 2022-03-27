import { IUserEntity } from '../interfaces';
import { userService } from './user.service';
import { tokenService } from './token.service';

class AuthService {
    public async registration(user: IUserEntity) {
        const { email } = user;
        const userFromDB = await userService.getUserByEmail(email);

        if (userFromDB) {
            throw new Error(`User with:  ${email} email already exists`);
        }

        const newUser = await userService.creteUser(user);
        return this._getTokenData(newUser);
    }

    private async _getTokenData(data:IUserEntity) {
        const { id, email } = data;
        const tokenPair = await tokenService.generateTokenPair({ userId: id, userEmail: email });

        await tokenService.saveTokens({
            userId: id,
            accessToken: tokenPair.accessToken,
            refreshToken: tokenPair.refreshToken,
        });

        return {
            ...tokenPair,
            userId: id,
            userEmail: email,
        };
    }
}

export const authService = new AuthService();
