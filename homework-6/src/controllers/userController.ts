import { Request, Response } from 'express';

import { IUser } from '../entity/user';
import { userService } from '../services/userService';

class UserController {
    public async getAllUsers(req:Request, res:Response): Promise<Response<IUser[]>> {
        const users = await userService.getAllUsers();
        return res.json(users);
    }

    public async createUser(req: Request, res: Response): Promise<Response<IUser>> {
        const newUser = await userService.createUser(req.body);
        return res.json(newUser);
    }

    public async updateById(req:Request, res: Response): Promise<Response<IUser>> {
        const { password, email } = req.body;
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
