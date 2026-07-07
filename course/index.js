import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import course from './routes/course.Route.js';
import { errorMiddleware } from './middleware/errorMiddleware.js'
import { dbConnection } from './config/dbConnection.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser())
app.use(cors({
    origin:'http://localhost:4000',
    credentials:true,
}))
app.use('/',course);
app.use(errorMiddleware);
const port = process.env.PORT;
const uri = process.env.MONGO_URI;
app.listen(port, async()=>{
    await dbConnection(uri)
    console.log(`server is running at port ${port}`)
})