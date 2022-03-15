import jwt, { JwtPayload } from 'jsonwebtoken';

import { config } from '../config/config';
import { IToken } from '../entity/token';
import { ITokenPair, IUserPayload } from '../interfaces/token.interface';
import { tokenRepository } from '../repositories/token/tokenRepository';

class TokenService {
    public async generateTokenPairs(payload: IUserPayload):
        Promise<ITokenPair> {
        const accessToken = jwt.sign(payload, config.SECRET_ACCESS__KEY as string, { expiresIn: '1d' });
        const refreshToken = jwt.sign(payload, config.SECRET_REFRESH__KEY as string, { expiresIn: '1d' });

        return {
            accessToken,
            refreshToken,
        };
    }

    public async saveToken(userId: number, refreshToken: string): Promise<IToken> {
        const tokenFromDb = await tokenRepository.findTokenUserByUserId(userId);

        if (tokenFromDb) {
            tokenFromDb.refreshToken = refreshToken;
            return tokenRepository.createToken(tokenFromDb);
        }

        return tokenRepository.createToken({ refreshToken, userId });
    }

    public async deleteTokenPair(userId: number) {
        return tokenRepository.delete({ userId });
    }

    public async verifyToken(authToken: string, tokenType = 'access'): Promise<string | JwtPayload> {
        let secretWord = config.SECRET_ACCESS__KEY;

        if (tokenType === 'refresh') {
            secretWord = config.SECRET_REFRESH__KEY;
        }
        return jwt.verify(authToken, secretWord as string); // resh
    }
}

export const tokenService = new TokenService();
