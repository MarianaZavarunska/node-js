import bcrypt from 'bcrypt';

import { IUserEntity } from '../interfaces';
import { userRepository } from '../repositories/user/user.repository';

class UserService {
    public async getUserByEmail(userEmail:string): Promise<IUserEntity | undefined> {
        const user = await userRepository.getUserByEmail(userEmail);
        return user;
    }

    public async creteUser(user:IUserEntity): Promise<IUserEntity> {
        const { password } = user;

        const hashedPassword = await this._hashPassword(password);
        const data = { ...user, password: hashedPassword };

        const newUser = await userRepository.creteUser(data);
        return newUser;
    }

    private async _hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, 10);
    }
}

export const userService = new UserService();
