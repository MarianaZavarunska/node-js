import { ICommonEntity } from './commonFields.interface';

export interface IUserEntity extends ICommonEntity{
    firstName: string,
    lastName: string,
    age?: number,
    phone: string,
    email: string,
    password: string,
}

export interface IPaginationResponse<T> {
    page: number,
    perPage: number,
    totalItems: number,
    data: T[],
}
// data: IUserEntity[],
