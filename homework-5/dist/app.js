"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const typeorm_1 = require("typeorm");
const user_1 = require("./entity/user");
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