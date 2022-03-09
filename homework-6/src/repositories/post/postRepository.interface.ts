import { UpdateResult } from 'typeorm';
import { IPost } from '../../entity/post';

export interface IPostRepository{
    getAllPostsById(userId: string): Promise<IPost[]>;
    updatePostById(updatedPostProp:Partial<IPost>): Promise<UpdateResult>;
}
