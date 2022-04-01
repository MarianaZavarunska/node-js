import jwt from 'jsonwebtoken';

import { IToken, ITokenPair, IUserPayload } from '../interfaces';
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

    public generateActionToken(payload: IUserPayload): string {
        return jwt.sign(
            payload,
            config.SECRET_ACTION__KEY,
            { expiresIn: config.ACTION_EXPIRE_TIME },
        );
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

    public async deleteTokenPairByParams(searchObject: Partial<IToken>) {
        return tokenRepository.deleteTokenByParams(searchObject);
    }

    public async verifyToken(authToken: string, tokenType = 'access'): Promise<IUserPayload> {
        let secretWord = config.SECRET_ACCESS__KEY;

        if (tokenType === 'refresh') {
            secretWord = config.SECRET_REFRESH__KEY;
        }
        if (tokenType === 'action') {
            secretWord = config.SECRET_ACTION__KEY;
        }

        return jwt.verify(authToken, secretWord as string) as IUserPayload;
    }
}

export const tokenService = new TokenService();
