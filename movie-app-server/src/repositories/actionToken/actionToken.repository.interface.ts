import { IActionToken, IActionTokenToSave } from '../../interfaces';

export interface IActionTokenRepository{
    createActionToken(tokenData: Partial<IActionToken>): Promise<Partial<IActionToken>>,
    findTokenByParams(findObject: Partial<IActionTokenToSave>): Promise<IActionToken | undefined>,
    deleteByParams(findObject: Partial<IActionTokenToSave>): void

}
