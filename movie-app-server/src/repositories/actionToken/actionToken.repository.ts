import { EntityRepository, getManager, Repository } from 'typeorm';

import { IActionToken, IActionTokenToSave } from '../../interfaces';
import { ActionToken } from '../../entities/actionToken';
import { IActionTokenRepository } from './actionToken.repository.interface';

@EntityRepository(ActionToken)
class ActionTokenRepository extends Repository<ActionToken> implements IActionTokenRepository {
    public async createActionToken(tokenData: IActionTokenToSave): Promise<IActionToken> {
        return getManager().getRepository(ActionToken).save(tokenData);
    }

    public async findTokenByParams(findObject: Partial<IActionTokenToSave>): Promise<IActionToken | undefined> {
        return getManager().getRepository(ActionToken).findOne(findObject);
    }

    public async deleteByParams(findObject: Partial<IActionTokenToSave>) {
        return getManager().getRepository(ActionToken).softDelete(findObject);
    }
}

export const actionTokenRepository = new ActionTokenRepository();
