import { IUserEntity } from '../../interfaces';

export interface IUserRepository{
    getUserByEmail(userEmail: string): Promise<IUserEntity | undefined>,
    creteUser(user: IUserEntity): Promise<IUserEntity>,
    getAllUsers(): Promise<IUserEntity[]>,
}
