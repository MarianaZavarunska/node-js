import { UpdateResult } from 'typeorm';

import { commentRepository } from '../repositories/comment/commentRepository';
import { IComment } from '../entity/comments';

class CommentService {
    async commentsAndPostsByUserId(userId:number): Promise<IComment[]> {
        const commentsAndPosts = await commentRepository.commentsAndPostsByUserId(userId);
        return commentsAndPosts;
    }

    async updateComment(commentId:number, action:string): Promise<UpdateResult> {
        const commentById = await commentRepository.getAllCommentsById(commentId);

        // eslint-disable-next-line max-len
        const updatedComment = await commentRepository.updateComment(commentId, commentById, action);

        return updatedComment;
    }
}

export const commentService = new CommentService();
