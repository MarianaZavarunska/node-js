import { UpdateResult } from 'typeorm';
import { IPost } from '../entity/post';
import { postRepository } from '../repositories/post/postRepository';

class PostService {
    async getAllPostsById(userId: string): Promise<IPost[]> {
        const posts = await postRepository.getAllPostsById(userId);
        return posts;
    }

    async updatePostById(updatedPostProp:Partial<IPost>): Promise<UpdateResult> {
        const updatedPost = await postRepository.updatePostById(updatedPostProp);
        return updatedPost;
    }
}

export const postService = new PostService();
