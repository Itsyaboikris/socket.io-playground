import express from 'express';
import { Server } from 'socket.io';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(express.static(__dirname + '/public'))

const expressServer = app.listen(9000, () => console.log("Server started."))

const io = new Server(expressServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

io.on("connection", (socket) => {
    socket.emit('messageFromServer', "Welcome to the websocket server!!")
    socket.on('messageToServer', (msg) => {
        console.log(msg)
    });

    socket.on('newMessageToServer', (msg) => {
        // console.log(msg)
        io.emit('messageToClients', {text: msg.text})
    })
});