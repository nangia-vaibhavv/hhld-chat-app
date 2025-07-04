import express from 'express'
import dotenv from 'dotenv'
import http from 'http'
import { Server } from 'socket.io'
import connectToMongo from './db/connectToMongo.js';
import { addMsgConversation } from './msgs.controllers.js';
import msgRouter  from './routes/msgs.routes.js';
const app = express();
dotenv.config();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*'
    }
})

var socketUserMap = []
io.on('connection', (socket) => {
    console.log("connection established");
    const username = socket.handshake.query.username;
    socketUserMap[username] = socket;
    socket.on('listeningMessage', (msg) => {
        const socketToReceive = socketUserMap[msg.receiver];
        if(socketToReceive) {
            socketToReceive.emit('sendToFE', msg)
        }
        addMsgConversation([msg.sender, msg.receiver], {
            text: msg.text,
            sender: msg.sender,
            receiver: msg.receiver
        })
    })
})

app.use('/msg', msgRouter);
app.get('/', (req, res) => {
    res.status(200).json("hellow")
})
const PORT = process.env.PORT || 3000;
connectToMongo();
server.listen((PORT), () => {
    console.log("server is up and running on port", PORT)
})