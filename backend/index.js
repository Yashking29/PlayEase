import  express  from "express";
import cookieParser from "cookie-parser";
import dotenv from 'dotenv';
import cors from 'cors';
import {router} from './Router.js'
import { createServer } from 'node:http';
import { Server } from 'socket.io';




dotenv.config();


const app=express();
app.use(cors({
    origin:["http://localhost:5173"],
    credentials:true,
    optionSuccessStatus: 200,
}))

// app.use(express.json())
// app.use(express.urlencoded({ extended: false }));


app.use('/',router);


// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
//     res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//     next();
// });


const httpServer = createServer(app);
const io = new Server(httpServer, {
   
    cors: {
      origin: ['http://localhost:5173'],
      credentials: true,
    },
});

io.on('connection', (socket) => {
    console.log('a user connected ');
    console.log(socket.id);
    let a=10;
    socket.on('message', (msg) => {
        console.log('message: ' + msg);
        socket.broadcast.emit('message',msg);
        
    });
    
    
});





httpServer.listen(3000, () => {
    console.log('server running at 3000');
});



