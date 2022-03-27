import { IToken } from '../../interfaces/token.interface';

export interface ITokenRepository {
    createToken(tokenData: IToken): Promise<IToken>,
    findTokenByParams(searchObject: Partial<IToken>): Promise<IToken | undefined>,
    deleteTokenByParams(findObject: Partial<IToken>): any,
}
