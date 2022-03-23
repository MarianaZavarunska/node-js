import bcrypt from 'bcrypt';
import { UpdateResult } from 'typeorm';

import { IUser } from '../entity/user';
import { userRepository } from '../repositories/user/userRepository';
import { tokenService } from './tokenService';

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

    public async registerUser(body: IUser) {
        const { email } = body;
        const userFromDB = await this.getUserByEmail(email);
        if (userFromDB) {
            throw new Error(`User with:  ${email} email already exists`);
        }
        const createdUser = await this.createUser(body);
        return this._getTokenData(createdUser);
    }

    public async updateById(updatedUserProp:Partial<IUser>): Promise<UpdateResult> {
        const { password } = updatedUserProp;
        const hashedPassword = await this._hashPassword(password as string);

        const dataToSave = { ...updatedUserProp, password: hashedPassword };

        const updatedUser = await userRepository.updatedById(dataToSave);
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

    private async _getTokenData(data:IUser) {
        const { id, email } = data;
        const tokenPair = await tokenService.generateTokenPair({ userId: id, userEmail: email });

        await tokenService.saveToken(id, tokenPair.refreshToken, tokenPair.accessToken);

        return {
            ...tokenPair,
            userId: id,
            userEmail: email,
        };
    }

    private async _hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, 10);
    }
}

export const userService = new UserService();
