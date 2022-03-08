import 'reflect-metadata';
import express, { Request, Response } from 'express';
import { createConnection, getManager } from 'typeorm';

import { User } from './entity/user';
import { Comment } from './entity/comments';
import { Post } from './entity/post';

const app = express();
app.use(express.json());
app.use(express.urlencoded());

app.get('/users', async (req: Request, res: Response) => {
    const users = await getManager().getRepository(User).find({ relations: ['posts'] });
    res.json(users);
});

app.post('/users', async (req: Request, res: Response) => {
    const newUser = await getManager().getRepository(User).save(req.body);
    res.json(newUser);
});

app.patch('/users/:id', async (req:Request, res: Response) => {
    const { password, email } = req.body;
    const { id } = req.params;
    const updatedUser = await getManager().getRepository(User).update(
        { id: Number(id) },
        { password, email },
    );
    res.json(updatedUser);
});

app.delete('/users/:id', async (req:Request, res: Response) => {
    const { id } = req.params;
    const deletedUser = await getManager().getRepository(User).softDelete(
        { id: Number(id) },
    );
    res.json(deletedUser);
});

// TASK 3

app.get('/posts/:userId', async (req:Request, res:Response) => {
    const { userId } = req.params;
    const posts = await getManager().getRepository(Post).createQueryBuilder('post')
        .where('post.userId = :userId', { userId })
        .getMany();
    res.json(posts);
});

// TASK 4

app.patch('/posts/:userId', async (req:Request, res:Response) => {
    const { userId } = req.params;
    const { content } = req.body;
    console.log(userId);
    const updatedPost = await getManager().getRepository(Post).update(
        { userId: Number(userId) },
        { content },
    );
    res.json(updatedPost);
});

app.get('/comments', async (req:Request, res:Response) => {
    const comments = await getManager().getRepository(Comment).find();
    res.json(comments);
});

// TASK 5

app.get('/comments/:userId', async (req:Request, res:Response) => {
    const { userId } = req.params;
    const commentsByUserId = await getManager().getRepository(Comment).createQueryBuilder('comment')
        .leftJoinAndSelect('comment.post', 'post')
        .where('comment.authorId = :userId', { userId })
        .andWhere('post.id = comment.postId')
        .getMany();
    res.json(commentsByUserId);
});

// TASK 6

app.patch('/comments/action', async (req:Request, res:Response) => {
    const { commentId, action } = req.body;
    const commentById = await getManager().getRepository(Comment).findOne({
        where: { id: Number(commentId) },
    });
    // if (action === 'like') {
    //     const updatedComment = await getManager().getRepository(Comment).update(
    //         { id: Number(commentId) },
    //         { likes: commentById?.likes ? commentById.likes + 1 : 1 },
    //     );
    //     res.json(updatedComment);
    // }
    // if (action === 'dislike') {
    //     const updatedComment = await getManager().getRepository(Comment).update(
    //         { id: Number(commentId) },
    //         { dislikes: commentById?.dislikes ? commentById.dislikes + 1 : 1 },
    //     );
    //     res.json(updatedComment);
    // }
    const updatedComment = await getManager().getRepository(Comment).update(
        { id: Number(commentId) },
        action === 'like'
            ? { likes: commentById?.likes ? commentById.likes + 1 : 1 }
            : { dislikes: commentById?.dislikes ? commentById.dislikes + 1 : 1 },
    );
    res.json(updatedComment);
});

app.listen(5400, async () => {
    console.log('Server has started again 🚀');
    try {
        const connection = await createConnection();
        if (connection) {
            console.log('Database connected');
        }
    } catch (err) {
        if (err) console.log(err);
    }
});
