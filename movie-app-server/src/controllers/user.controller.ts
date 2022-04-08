import { NextFunction, Request, Response } from 'express';

import { userService } from '../services';

class UserController {
    public async getUserPagination(req: Request, res: Response, next: NextFunction) {
        try {
            const { page = 1, perPage = 2, ...other } = req.query;
            const userPagination = await userService.getUserPagination(other, +perPage, +page);
            res.json(userPagination);
        } catch (e) {
            next(e);
        }
    }
}

export const userController = new UserController();
