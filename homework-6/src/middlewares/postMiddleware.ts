import { Response, NextFunction } from 'express';

import { postValidator } from '../validators/post.validators';
import { IRequestExtended } from '../interfaces';
import { ErrorHandler } from '../error/error.handler';

class PostMiddleware {
    async updatePost(req:IRequestExtended, res:Response, next:NextFunction) {
        try {
            const { error, value } = await postValidator.update.validate(req.body);

            if (error) {
                next(new ErrorHandler(error.details[0].message));
                return;
            }
            req.post = value;
            next();
        } catch (e) {
            next(e);
        }
    }
}

export const postMiddleware = new PostMiddleware();
