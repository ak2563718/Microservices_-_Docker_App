import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { errorMiddleware } from './middleware/errorMiddleware.js'
import { dbConnection } from './config/dbConnection.js';
import auth from './routes/auth.Route.js'

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(cors({
    origin:'http://localhost:5000',
    credentials:true,
}))
app.use('/',auth)

app.use(errorMiddleware);
const port = process.env.PORT;
const uri = process.env.MONGO_URI;
app.listen(port, async()=>{
    await dbConnection(uri)
    console.log(`server is running at port ${port}`)
})