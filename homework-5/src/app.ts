import 'reflect-metadata';
import express from 'express';
import { createConnection } from 'typeorm';

const app = express();

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
