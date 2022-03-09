import {
    EntityRepository, getManager, Repository, UpdateResult,
} from 'typeorm';

import { IUser, User } from '../../entity/user';
import { IUserRepository } from './userRepository.interface';

@EntityRepository(User)
class UserRepository extends Repository<User> implements IUserRepository {
    public async getAllUsers(): Promise<IUser[]> {
        return getManager().getRepository(User).find({ relations: ['posts', 'comments'] });
    }

    public async createUser(user:IUser): Promise<IUser> {
        return getManager().getRepository(User).save(user);
    }

    public async updatedById(updatedUserProp: Partial<User>): Promise<UpdateResult> {
        const { id, email, password } = updatedUserProp;
        return getManager().getRepository(User).update(
            { id },
            { password, email },
        );
    }

    public async deleteById(id:number): Promise<UpdateResult> {
        return getManager().getRepository(User).softDelete(
            { id },
        );
    }
}

export const userRepository = new UserRepository();
