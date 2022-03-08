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

app.get('/comments', async (req:Request, res:Response) => {
    const comments = await getManager().getRepository(Comment).find();
    res.json(comments);
});

app.get('posts/:userId', async (req:Request, res:Response) => {
    const { userId } = req.params;
    const posts = await getManager().getRepository(Post).createQueryBuilder('post')
        .where('post.userId = :userId', { userId })
        .getOne();
    res.json(posts);
});

app.patch('posts/:userId', async (req:Request, res:Response) => {
    const { userId } = req.params;
    const posts = await getManager().getRepository(Post).createQueryBuilder('post')
        .where('post.userId = :userId', { userId })
        .getOne();
    res.json(posts);
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
