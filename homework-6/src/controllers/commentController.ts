import { Request, Response } from 'express';

import { commentService } from '../services/commentService';
import { IComment } from '../entity/comments';
import { IRequestExtended, IUpdateComment } from '../interfaces';

class CommentController {
    // eslint-disable-next-line max-len
    public async commentsAndPostsByUserId(req:Request, res:Response): Promise<Response<IComment[]>> {
        const { userId } = req.params;

        const commentsAndPosts = await commentService.commentsAndPostsByUserId(+userId);
        return res.json(commentsAndPosts);
    }

    public async updateComment(req:IRequestExtended, res:Response): Promise<Response<IComment>> {
        const { commentId, action } = req.comment as IUpdateComment;

        const updatedComment = await commentService.updateComment(commentId, action);
        return res.json(updatedComment);
    }
}

export const commentController = new CommentController();
