import {
    EntityRepository, getManager, Repository, UpdateResult,
} from 'typeorm';

import { User } from '../../entities/user';
import { IUserEntity } from '../../interfaces';
import { IUserRepository } from './user.repository.interface';

@EntityRepository(User)
class UserRepository extends Repository<User> implements IUserRepository {
    public async getUserByEmail(userEmail: string): Promise<IUserEntity | undefined> {
        return getManager().getRepository(User).createQueryBuilder('user')
            .where('user.email = :userEmail', { userEmail })
            .andWhere('user.deletedAt IS NULL')
            .getOne();
    }

    public async creteUser(user: IUserEntity): Promise<IUserEntity> {
        return getManager().getRepository(User).save(user);
    }

    public async updateUser(user: Partial<IUserEntity>): Promise<UpdateResult> {
        return getManager().getRepository(User).update({ id: user.id }, { password: user.password });
    }
}

export const userRepository = new UserRepository();
