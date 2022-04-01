import { EntityRepository, getManager, Repository } from 'typeorm';

import { Token } from '../../entities/token';
import { IToken } from '../../interfaces';
import { ITokenRepository } from './token.repositoty.interface';

@EntityRepository(Token)
class TokenRepository extends Repository<Token> implements ITokenRepository {
    public async createToken(tokenData: IToken): Promise<IToken> {
        return getManager().getRepository(Token).save(tokenData);
    }

    public async findTokenByParams(searchObject: Partial<IToken>): Promise<IToken | undefined> {
        return getManager().getRepository(Token).findOne(searchObject);
    }

    public async deleteTokenByParams(findObject: Partial<IToken>) {
        return getManager().getRepository(Token).delete(findObject);
    }
}

export const tokenRepository = new TokenRepository();
