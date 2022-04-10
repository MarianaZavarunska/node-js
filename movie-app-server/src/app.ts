import 'reflect-metadata';
import express from 'express';
import fileUpload from 'express-fileupload';
import { createConnection } from 'typeorm';
import cors from 'cors';

import { config } from './config/config';
import { apiRouter } from './routers/apiRouter';
import { cronRun } from './cron';

const app = express();

app.use(fileUpload());

app.use(cors({
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200, // For legacy browser support
    methods: 'GET, PUT, POST',
    credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(apiRouter);

// @ts-ignore
app.use('*', (err, req, res, next) => {
    res
        .status(err.status || 500)
        .json({
            message: err.message,
            data: err.data,
        });
});

const { PORT } = config;

app.listen(PORT, async () => {
    console.log(`Server has started again 🚀 on port ${PORT}`);

    try {
        const connection = await createConnection();
        if (connection) console.log('Connection established!');
        cronRun();
    } catch (e) {
        if (e) console.log(e);
    }
});
