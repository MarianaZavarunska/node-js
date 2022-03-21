import bcrypt from 'bcrypt';
import { UpdateResult } from 'typeorm';

import { IUser, User } from '../entity/user';
import { userRepository } from '../repositories/user/userRepository';

class UserService {
    public async getAllUsers(): Promise<IUser[]> {
        const users = await userRepository.getAllUsers();
        return users;
    }

    public async getUserByEmail(email: string): Promise<IUser | undefined> {
        const user = await userRepository.getUserByEmail(email);
        return user;
    }

    public async createUser(user: IUser): Promise<IUser> {
        const { password } = user;

        const hashedPassword = await this._hashPassword(password);
        const dataToSave = { ...user, password: hashedPassword };

        const newUser = await userRepository.createUser(dataToSave);
        return newUser;
    }

    public async updateById(updatedUserProp:Partial<User>): Promise<UpdateResult> {
        const updatedUser = await userRepository.updatedById(updatedUserProp);
        return updatedUser;
    }

    public async deleteById(id:string): Promise<UpdateResult> {
        const deletedUser = await userRepository.deleteById(+id);
        return deletedUser;
    }

    public async compareUserPasswords(password:string, hash:string): Promise<void | Error> {
        const isPasswordUnique = await bcrypt.compare(password, hash);

        if (!isPasswordUnique) {
            throw new Error('User does not exist');
        }
    }

    private async _hashPassword(password:string): Promise<string> {
        return bcrypt.hash(password, 10);
    }
}

export const userService = new UserService();
