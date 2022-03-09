import { Request, Response } from 'express';

import { commentService } from '../services/commentService';
import { IComment } from '../entity/comments';

class CommentController {
    // eslint-disable-next-line max-len
    public async commentsAndPostsByUserId(req:Request, res:Response): Promise<Response<IComment[]>> {
        const { userId } = req.params;

        const commentsAndPosts = await commentService.commentsAndPostsByUserId(+userId);
        return res.json(commentsAndPosts);
    }

    public async updateComment(req:Request, res:Response): Promise<Response<IComment>> {
        const { commentId, action } = req.body;

        const updatedComment = await commentService.updateComment(+commentId, action);
        return res.json(updatedComment);
    }
}

export const commentController = new CommentController();
