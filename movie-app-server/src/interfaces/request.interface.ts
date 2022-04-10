import { Request } from 'express';

import { IUserEntity } from './user.interface';

export interface IRequestExtended extends Request {
    user?: IUserEntity,
    photos?: any[],
    videos?: any[],

}
