import { IPaginationResponse, IUserEntity } from '../../interfaces';

export interface IUserRepository{
    getUserByEmail(userEmail: string): Promise<IUserEntity | undefined>,
    creteUser(user: IUserEntity): Promise<IUserEntity>,
    getAllUsers(): Promise<IUserEntity[]>,
    getUserPagination(searchObject: Partial<IUserEntity>, limit: number, page: number): Promise<IPaginationResponse<IUserEntity>>,
}
