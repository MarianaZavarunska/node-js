import {
    EntityRepository,
    getManager,
    Repository,
    UpdateResult,
} from 'typeorm';

import { User } from '../../entities/user';
import { IPaginationResponse, IUserEntity } from '../../interfaces';
import { IUserRepository } from './user.repository.interface';

@EntityRepository(User)
class UserRepository extends Repository<User> implements IUserRepository {
    public async getUserByEmail(
        userEmail: string,
    ): Promise<IUserEntity | undefined> {
        return getManager()
            .getRepository(User)
            .createQueryBuilder('user')
            .where('user.email = :userEmail', { userEmail })
            .andWhere('user.deletedAt IS NULL')
            .getOne();
    }

    public async creteUser(user: IUserEntity): Promise<IUserEntity> {
        return getManager().getRepository(User).save(user);
    }

    public async updateUser(user: Partial<IUserEntity>): Promise<UpdateResult> {
        return getManager()
            .getRepository(User)
            .update({ id: user.id }, { password: user.password });
    }

    public async updateUserAvatar(
        user: Partial<IUserEntity>,
    ): Promise<UpdateResult> {
        return getManager()
            .getRepository(User)
            .update({ id: user.id }, { avatar: user.avatar });
    }

    public async getAllUsers(): Promise<IUserEntity[]> {
        return getManager()
            .getRepository(User)
            .createQueryBuilder('user')
            .where('user.createdAt IS NOT NULL')
            .andWhere('user.deletedAt IS NULL')
            .getMany();
    }

    // PAGINATION (for frontend )

    public async getUserPagination(
        searchObject: Partial<IUserEntity> = {},
        limit: number,
        page: number = 1,
    ): Promise<IPaginationResponse<IUserEntity>> {
        const skip = limit * (page - 1);
        const [users, totalItems] = await getManager()
            .getRepository(User)
            .findAndCount({ where: searchObject, skip, take: limit });

        // console.log(users);

        return {
            page,
            perPage: limit,
            totalItems,
            data: users,
        };
    }
}

export const userRepository = new UserRepository();
