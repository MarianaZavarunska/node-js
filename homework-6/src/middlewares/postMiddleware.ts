import { Response, NextFunction } from 'express';

import { postValidator } from '../validators/post.validators';
import { IRequestExtended } from '../interfaces';

class PostMiddleware {
    async updatePost(req:IRequestExtended, res:Response, next:NextFunction) {
        try {
            const { error, value } = await postValidator.update.validate(req.body);

            if (error) {
                throw new Error(error.details[0].message);
            }
            req.post = value;
            next();
        } catch (e:any) {
            res.status(400).json(e.message);
        }
    }
}

export const postMiddleware = new PostMiddleware();
