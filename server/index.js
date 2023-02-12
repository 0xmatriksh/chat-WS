const express = require('express');

app = express()

const http = require('http');
const cors = require('cors');
const { Server } = require("socket.io");
app.use(cors());

const server = app.listen(3001, () => {
    console.log("SERVER RUNNING");
})

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
    }
})

global.onlineUsers = new Map();

io.on("connection", (socket) => {
    console.log("Connected", socket.id);

    socket.on("add-user", (userId) => {
        onlineUsers.set(userId, socket.id);
    });

    socket.on("send_message", (data) => {
        // NOW SEND THE REQUEST TO(RECIEVER SOCKET ID)
        // socket.to(user.socketId).emit("receive_message", data);
        const sendUserSocket = onlineUsers.get(data.to);
        if (sendUserSocket) {
            socket.to(sendUserSocket).emit("msg-recieved", data);
        }
    })

    socket.on("disconnect", () => {
        console.log("User Disconnected", socket.id);
    })
})