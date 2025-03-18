const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('.'));

io.on('connection', (socket) => {
    console.log('Un jugador se ha conectado');

    socket.on('chat message', msg => {
        io.emit('chat message', msg);
    });

    socket.on('disconnect', () => {
        console.log('Un jugador se ha desconectado');
        io.emit('chat message', 'Un jugador se ha desconectado');
    });
});

server.listen(3000, () => {
    console.log('Servidor escuchando en el puerto 3000');
});
