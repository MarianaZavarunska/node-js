import jwt from 'jsonwebtoken';

import { config } from '../config/config';
import { IToken } from '../entity/token';
import { ITokenPair, IUserPayload } from '../interfaces/token.interface';
import { tokenRepository } from '../repositories/token/tokenRepository';

class TokenService {
    public generateTokenPair(payload: IUserPayload):
      ITokenPair {
        const accessToken = jwt.sign(payload, config.SECRET_ACCESS__KEY as string, { expiresIn: '1d' });
        const refreshToken = jwt.sign(payload, config.SECRET_REFRESH__KEY as string, { expiresIn: '1d' });

        return {
            accessToken,
            refreshToken,
        };
    }

    public async saveToken(userId: number, accessToken:
        string, refreshToken: string): Promise<IToken> {
        const tokenFromDb = await tokenRepository.findTokenUserByParams({ userId });

        if (tokenFromDb) {
            tokenFromDb.refreshToken = refreshToken;
            tokenFromDb.accessToken = accessToken;
            return tokenRepository.createToken(tokenFromDb);
        }

        return tokenRepository.createToken({ refreshToken, accessToken, userId });
    }

    public async deleteTokenPair(userId: number) {
        return tokenRepository.deleteTokenByParams({ userId });
    }

    public async deleteTokenPairByParams(searchObject: Partial<IToken>) {
        return tokenRepository.deleteTokenByParams(searchObject);
    }

    public async verifyToken(authToken: string, tokenType = 'access'): Promise<IUserPayload> {
        let secretWord = config.SECRET_ACCESS__KEY;

        if (tokenType === 'refresh') {
            secretWord = config.SECRET_REFRESH__KEY;
        }
        return jwt.verify(authToken, secretWord as string) as IUserPayload; // resh
    }
}

export const tokenService = new TokenService();
