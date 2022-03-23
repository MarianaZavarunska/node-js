import { Request } from 'express';

import { IPost } from '../entity/post';
import { IUser } from '../entity/user';

export interface IUpdateComment{
   commentId: number,
   action: string
}

export interface IRequestExtended extends Request{
   user? : IUser,
   post?: IPost,
   updateUser?: Partial<IUser>,
   comment?: IUpdateComment,
}
