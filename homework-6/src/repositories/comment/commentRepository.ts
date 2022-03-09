import {
    EntityRepository, getManager, Repository, UpdateResult,
} from 'typeorm';

import { Comment, IComment } from '../../entity/comments';

@EntityRepository(Comment)
class CommentRepository extends Repository<Comment> {
    public async commentsAndPostsByUserId(userId:number): Promise<IComment[]> {
        return getManager().getRepository(Comment).createQueryBuilder('comment')
            .leftJoinAndSelect('comment.post', 'post')
            .where('comment.authorId = :userId', { userId })
            .andWhere('post.id = comment.postId')
            .getMany();
    }

    public async getAllCommentsById(commentId:number): Promise<IComment | undefined> {
        return getManager().getRepository(Comment).findOne({
            where: { id: commentId },
        });
    }

    // eslint-disable-next-line max-len
    public async updateComment(commentId:number, commentById:IComment | undefined, action:string): Promise<UpdateResult> {
        return getManager().getRepository(Comment).update(
            { id: Number(commentId) },
            action === 'like'
                ? { likes: commentById?.likes ? commentById.likes + 1 : 1 }
                : { dislikes: commentById?.dislikes ? commentById.dislikes + 1 : 1 },
        );
    }
}

export const commentRepository = new CommentRepository();
