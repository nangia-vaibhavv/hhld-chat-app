import express from 'express'
import dotenv from 'dotenv'
import http from 'http'
import { Server } from 'socket.io'
const app = express();
dotenv.config();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*'
    }
})

io.on('connection', (socket) => {
    console.log("connection established");
    socket.on('listeningMessage', (msg) => {
        console.log("received message:", msg);
        socket.broadcast.emit('broadcast to all except sender', msg);
        io.emit('broadcast all incl sender', msg);
    })
})

app.get('/', (req, res) => {
    res.status(200).json("hellow")
})
const PORT = process.env.PORT || 3000;
server.listen((PORT), () => {
    console.log("server is up and running on port", PORT)
})