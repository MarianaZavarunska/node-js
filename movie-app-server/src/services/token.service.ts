import jwt from 'jsonwebtoken';

import { IToken, ITokenPair, IUserPayload } from '../interfaces/token.interface';
import { config } from '../config/config';
import { tokenRepository } from '../repositories/token/token.repository';

class TokenService {
    public generateTokenPair(payload: IUserPayload): ITokenPair {
        const accessToken = jwt.sign(
            payload,
            config.SECRET_ACCESS__KEY as string,
            { expiresIn: config.ACCESS_EXPIRE_TIME },
        );
        const refreshToken = jwt.sign(
            payload,
            config.SECRET_REFRESH__KEY as string,
            { expiresIn: config.REFRESH_EXPIRE_TIME },
        );

        return {
            accessToken,
            refreshToken,
        };
    }

    public async saveTokens(dataToSave: IToken): Promise<IToken> {
        const { userId, accessToken, refreshToken } = dataToSave;

        const tokenFromDB = await tokenRepository.findTokenByParams({ userId });

        if (tokenFromDB) {
            tokenFromDB.accessToken = accessToken;
            tokenFromDB.refreshToken = refreshToken;
            return tokenRepository.createToken(tokenFromDB);
        }

        return tokenRepository.createToken(dataToSave);
    }
}

export const tokenService = new TokenService();