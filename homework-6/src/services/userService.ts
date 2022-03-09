import { UpdateResult } from 'typeorm';

import { IUser, User } from '../entity/user';
import { userRepository } from '../repositories/user/userRepository';

class UserService {
    async getAllUsers(): Promise<IUser[]> {
        const users = await userRepository.getAllUsers();
        return users;
    }

    async createUser(user: IUser): Promise<IUser> {
        const newUser = await userRepository.createUser(user);
        return newUser;
    }

    async updateById(updatedUserProp:Partial<User>): Promise<UpdateResult> {
        const updatedUser = await userRepository.updatedById(updatedUserProp);
        return updatedUser;
    }

    async deleteById(id:string): Promise<UpdateResult> {
        const deletedUser = await userRepository.deleteById(+id);
        return deletedUser;
    }
}

export const userService = new UserService();
