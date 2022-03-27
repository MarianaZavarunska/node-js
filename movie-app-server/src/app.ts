import 'reflect-metadata';
import express from 'express';
import { createConnection } from 'typeorm';

import { config } from './config/config';
import { apiRouter } from './routers/apiRouter';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(apiRouter);

const { PORT } = config;

app.listen(PORT, async () => {
    console.log(`Server has started again 🚀 on port ${PORT}`);

    try {
        const connection = await createConnection();
        if (connection) console.log('Connection established!');
    } catch (e) {
        if (e) console.log(e);
    }
});