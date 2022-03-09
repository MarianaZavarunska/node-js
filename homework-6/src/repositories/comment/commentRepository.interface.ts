import { IComment } from '../../entity/comments';

export interface ICommentRepository{
    commentsAndPostsByUserId(userId:number): Promise<IComment[]>;
}
