import { Request, Response } from 'express';

import { postService } from '../services/postService';
import { IPost } from '../entity/post';

class PostController {
    public async getAllPostsById(req:Request, res:Response): Promise<Response<IPost[]>> {
        const { userId } = req.params;
        const posts = await postService.getAllPostsById(userId);
        return res.json(posts);
    }

    public async updatePostById(req:Request, res:Response): Promise<Response<IPost>> {
        const { userId } = req.params;
        const { content } = req.body;
        const updatedPostProp = { userId: Number(userId), content };

        const updatedPost = await postService.updatePostById(updatedPostProp);
        return res.json(updatedPost);
    }
}

export const postController = new PostController();
