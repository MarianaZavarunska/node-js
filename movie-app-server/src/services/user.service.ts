import bcrypt from 'bcrypt';
import { UpdateResult } from 'typeorm';

import { IUserEntity } from '../interfaces';
import { userRepository } from '../repositories/user/user.repository';

class UserService {
    public async getUserByEmail(
        userEmail: string,
    ): Promise<IUserEntity | undefined> {
        const user = await userRepository.getUserByEmail(userEmail);
        return user;
    }

    public async getUserPagination(
        filterObject: any,
        perPage: number,
        page: number,
    ) {
        return userRepository.getUserPagination(filterObject, perPage, page);
    }

    public async creteUser(user: IUserEntity): Promise<IUserEntity> {
        const { password } = user;
        console.log(user);
        const hashedPassword = await this._hashPassword(password);
        const data = { ...user, password: hashedPassword, avatar: '' };

        const newUser = await userRepository.creteUser(data);
        return newUser;
    }

    public async updateUser(
        userId: number,
        user: Partial<IUserEntity>,
    ): Promise<UpdateResult> {
        if (user.password) {
            // eslint-disable-next-line no-param-reassign
            user.password = await this._hashPassword(user.password);
        }

        return userRepository.updateUser({ id: userId, password: user.password });
    }

    public async updateUserAvatar(
        user: Partial<IUserEntity>,
    ): Promise<UpdateResult> {
        return userRepository.updateUserAvatar({
            id: user.id,
            avatar: user.avatar,
        });
    }

    public async compareUserPasswords(
        password: string,
        hashedPassword: string,
    ): Promise<void | Error> {
        const isPasswordUnique = await bcrypt.compare(password, hashedPassword);

        if (!isPasswordUnique) {
            throw new Error('Password or email is wrong');
        }
    }

    private async _hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, 10);
    }
}

export const userService = new UserService();
