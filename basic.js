import * as http from 'http';
import { Server } from 'socket.io';

const httpServer = http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
    res.setHeader('Access-Control-Max-Age', 2592000)

    res.end("I am connected!")
});

const io = new Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

io.on("connection", (socket) => {
    socket.emit('welcome', "Welcome to the websocket server!!")
    socket.on('message', (msg) => {
       console.log(msg)
    });
});

httpServer.listen(8000, () => console.log("Server running on port 8000"))