import { UpdateResult } from 'typeorm';

import { IUser, User } from '../../entity/user';

export interface IUserRepository{
    getAllUsers(): Promise<IUser[]>;
    createUser(user:IUser): Promise<IUser>;
    updatedById(updatedUserProp: Partial<User>): Promise<UpdateResult>;
    deleteById(id:number): Promise<UpdateResult>
}
