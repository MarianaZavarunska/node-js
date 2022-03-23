import { NextFunction, Response } from 'express';

import { commentValidator } from '../validators/comment.validator';
import {IRequestExtended} from "../interfaces";

class CommentMiddleware {
    async validateComment(req:IRequestExtended, res:Response, next:NextFunction) {
        try {
            const { error, value } = await commentValidator.updateComment.validate(req.body);

            if (error) {
                throw new Error(error.details[0].message);
            }
            req.comment = value;
            next();
        } catch (e:any) {
            res.status(400).json(e.message);
        }
    }
}

export const commentMiddleware = new CommentMiddleware();
