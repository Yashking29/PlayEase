import  express  from "express";
import cookieParser from "cookie-parser";
import dotenv from 'dotenv';
import cors from 'cors';
import {router} from './Router.js'


dotenv.config();


const app=express();
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(cors({
    origin:["http://localhost:5173"],
    credentials:true,
    optionSuccessStatus: 200,
}))

app.use('/',router);

app.listen(process.env.PORT,()=>{
     console.log(`Server is listening to the port ${process.env.PORT}`);
})