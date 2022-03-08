"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const typeorm_1 = require("typeorm");
const user_1 = require("./entity/user");
const comments_1 = require("./entity/comments");
const post_1 = require("./entity/post");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded());
app.get('/users', async (req, res) => {
    const users = await (0, typeorm_1.getManager)().getRepository(user_1.User).find({ relations: ['posts'] });
    res.json(users);
});
app.post('/users', async (req, res) => {
    const newUser = await (0, typeorm_1.getManager)().getRepository(user_1.User).save(req.body);
    res.json(newUser);
});
app.patch('/users/:id', async (req, res) => {
    const { password, email } = req.body;
    const { id } = req.params;
    const updatedUser = await (0, typeorm_1.getManager)().getRepository(user_1.User).update({ id: Number(id) }, { password, email });
    res.json(updatedUser);
});
app.delete('/users/:id', async (req, res) => {
    const { id } = req.params;
    const deletedUser = await (0, typeorm_1.getManager)().getRepository(user_1.User).softDelete({ id: Number(id) });
    res.json(deletedUser);
});
// TASK 3
app.get('/posts/:userId', async (req, res) => {
    const { userId } = req.params;
    const posts = await (0, typeorm_1.getManager)().getRepository(post_1.Post).createQueryBuilder('post')
        .where('post.userId = :userId', { userId })
        .getMany();
    res.json(posts);
});
// TASK 4
app.patch('/posts/:userId', async (req, res) => {
    const { userId } = req.params;
    const { content } = req.body;
    console.log(userId);
    const updatedPost = await (0, typeorm_1.getManager)().getRepository(post_1.Post).update({ userId: Number(userId) }, { content });
    res.json(updatedPost);
});
app.get('/comments', async (req, res) => {
    const comments = await (0, typeorm_1.getManager)().getRepository(comments_1.Comment).find();
    res.json(comments);
});
// TASK 5
app.get('/comments/:userId', async (req, res) => {
    const { userId } = req.params;
    const commentsByUserId = await (0, typeorm_1.getManager)().getRepository(comments_1.Comment).createQueryBuilder('comment')
        .leftJoinAndSelect('comment.post', 'post')
        .where('comment.authorId = :userId', { userId })
        .andWhere('post.id = comment.postId')
        .getMany();
    res.json(commentsByUserId);
});
// TASK 6
app.patch('/comments/action', async (req, res) => {
    const { commentId, action } = req.body;
    const commentById = await (0, typeorm_1.getManager)().getRepository(comments_1.Comment).findOne({
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
    const updatedComment = await (0, typeorm_1.getManager)().getRepository(comments_1.Comment).update({ id: Number(commentId) }, action === 'like'
        ? { likes: commentById?.likes ? commentById.likes + 1 : 1 }
        : { dislikes: commentById?.dislikes ? commentById.dislikes + 1 : 1 });
    res.json(updatedComment);
});
app.listen(5400, async () => {
    console.log('Server has started again 🚀');
    try {
        const connection = await (0, typeorm_1.createConnection)();
        if (connection) {
            console.log('Database connected');
        }
    }
    catch (err) {
        if (err)
            console.log(err);
    }
});
//# sourceMappingURL=app.js.map