import { Request, Response } from 'express';

import { IUser } from '../entity/user';
import { userService } from '../services/userService';
import { IRequestExtended, ITokenData } from '../interfaces';
import { COOKIE } from '../constans/cookie';

class UserController {
    public async getAllUsers(req:Request, res:Response): Promise<Response<IUser[]>> {
        const users = await userService.getAllUsers();
        return res.json(users);
    }

    public async getUserByEmail(req:Request, res:Response): Promise<Response<IUser | undefined>> {
        const { email } = req.body;
        const user = await userService.getUserByEmail(email);
        return res.json(user);
    }

    public async createUser(req: Request, res: Response): Promise<Response<ITokenData>> {
        const data = await userService.registerUser(req.body);
        // write in cookies
        res.cookie(
            'refreshToken',
            COOKIE.nameRefreshToken,
            { maxAge: COOKIE.maxAgeRefreshToken, httpOnly: true },
            // in order to via cookies write some js code
        );
        return res.json(data);
    }

    public async updateById(req:IRequestExtended, res: Response): Promise<Response<IUser>> {
        const { password, email } = req.updateUser as Partial<IUser>;
        const { id } = req.params;
        const updatedUserProp = { id: Number(id), password, email };

        const updatedUser = await userService.updateById(updatedUserProp);
        return res.json(updatedUser);
    }

    public async deleteById(req:Request, res: Response): Promise<Response<IUser>> {
        const { id } = req.params;

        const deletedUser = await userService.deleteById(id);
        return res.json(deletedUser);
    }
}

export const userController = new UserController();
