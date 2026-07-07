import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import { errorMiddleware } from './middleware/errorMiddleware.js'
import { dbConnection } from './config/dbConnection.js';
import enroll from './routes/enroll.Route.js'

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(cors({
    origin:'http://localhost:5000',
    credentials:true,
}))
app.use('/',enroll)
app.use(errorMiddleware)
const port = process.env.PORT;
const uri = process.env.MONGO_URI;
app.listen(port, async()=>{
    await dbConnection(uri)
    console.log(`server is running at port ${port}`)
})