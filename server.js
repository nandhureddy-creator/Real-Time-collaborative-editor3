// server.js
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve static files from "public"
app.use(express.static(path.join(__dirname, 'public')));

// When client connects
io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('text-update', (data) => {
        // Broadcast to all clients except sender
        socket.broadcast.emit('receive-text', data);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
