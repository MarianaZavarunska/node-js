import { IToken } from '../../entity/token';

import { ITokenDataToSave } from '../../interfaces/token.interface';

export interface ITokenRepository {
    createToken(token: ITokenDataToSave): Promise<IToken>;
    findTokenUserByParams(searchObject: Partial<IToken>): Promise<IToken | undefined>;
}
