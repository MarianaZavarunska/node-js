import {
    EntityRepository, getManager, Repository, UpdateResult,
} from 'typeorm';

import { IPost, Post } from '../../entity/post';
import { IPostRepository } from './postRepository.interface';

@EntityRepository(Post)
class PostRepository extends Repository<Post> implements IPostRepository {
    public async getAllPostsById(userId: string): Promise<IPost[]> {
        return getManager().getRepository(Post).createQueryBuilder('post')
            .where('post.userId = :userId', { userId })
            .getMany();
    }

    public async updatePostById(updatedPostProp:Partial<IPost>): Promise<UpdateResult> {
        const { userId, content } = updatedPostProp;
        return getManager().getRepository(Post).update(
            { userId },
            { content },
        );
    }
}

export const postRepository = new PostRepository();
