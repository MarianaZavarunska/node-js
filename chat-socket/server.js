const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const formatMessage = require('./helpers/message');
const { userJoin, getCurrentUser, userLeave, getRoomUsers } = require('./helpers/users');

const botName = 'Chat Bot';


const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
    socket.on('join-room', ({ username, room }) => {
        const user = userJoin(socket.id, username, room);

        socket.join(user.room);

        socket.emit('message', formatMessage(botName, 'Welcome to our chat'));
        socket.broadcast.to(user.room).emit('message', formatMessage(botName, `${user.username} has jointed`));

        //send users and room info
        io.to(user.room).emit('room-users', {
            room: user.room,
            users: getRoomUsers(user.room),
        });
    });


    socket.on('send-message', (message) => {

        const user = getCurrentUser(socket.id,);

        io.to(user.room).emit('message', formatMessage(user.username, message));
    });

    socket.on('disconnect', () => {
        const user = userLeave(socket.id);

        if (user) {
            io.to(user.room).emit('message', formatMessage(botName, `${user.username} has left a chat`));

            //send users and room info
            io.to(user.room).emit('room-users', {
                room: user.room,
                users: getRoomUsers(user.room),
            });
        }
    });

});

const PORT = 3500;

server.listen(PORT, () => {
    console.log(`Server has started again on port ${PORT}`);
});