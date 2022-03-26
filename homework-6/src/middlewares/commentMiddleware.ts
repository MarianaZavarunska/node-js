import { NextFunction, Response } from 'express';

import { commentValidator } from '../validators/comment.validator';
import { IRequestExtended } from '../interfaces';
import { ErrorHandler } from '../error/error.handler';

class CommentMiddleware {
    async validateComment(req:IRequestExtended, res:Response, next:NextFunction) {
        try {
            const { error, value } = await commentValidator.updateComment.validate(req.body);

            if (error) {
                next(new ErrorHandler(error.details[0].message));
                return;
            }
            req.comment = value;
            next();
        } catch (e) {
            next(e);
        }
    }
}

export const commentMiddleware = new CommentMiddleware();
