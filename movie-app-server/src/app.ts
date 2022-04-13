import 'reflect-metadata';
import http from 'http';
import express from 'express';
import fileUpload from 'express-fileupload';
import { createConnection } from 'typeorm';
import cors from 'cors';
import SocketIo, { Socket } from 'socket.io';

import { config } from './config/config';
import { apiRouter } from './routers/apiRouter';
import { cronRun } from './cron';

const app = express();
const server = http.createServer(app);

// @ts-ignore
const io = SocketIo(server, {
    cors: {
        origin: '*',
    },
});

// io.on('connection', (socket:Socket) => {
//     socket.emit('chat-message', 'Hello');
//     socket.on('send-message', (message:string) => {
//        socket.broadcast.emit('chat-message', message);
//     });
// });

// Client Connects

io.on('connection', (socket:Socket) => {
    socket.emit('message', 'Hello');

    // broadcast when user connects

    socket.broadcast.emit('message', 'A user is connected');

    //run when client disconnects

    socket.on('disconnect', () => {
        io.emit('message', 'User  has lefted chat')
    })


});


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

server.listen(PORT, async () => {
    console.log(`Server has started again 🚀 on port ${PORT}`);

    try {
        const connection = await createConnection();
        if (connection) console.log('Connection established!');
        cronRun();
    } catch (e) {
        if (e) console.log(e);
    }
});
