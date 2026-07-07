import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import axios from 'axios'

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors())
app.use(cookieParser())

const auth_url = 'http://localhost:5001';
const course_url = 'http://localhost:5002';
const enroll_url = 'http://localhost:5003';
// 1. Login Service
app.use('/api/auth', async( req, res)=>{
    try{
        const response = await axios({
            method: req.method,
            url: `${auth_url}${req.originalUrl.replace('/api/auth', '')}`,
            data: req.body,
            headers:{
                'Content-Type':'application/json',
            },
            params: req.query,
        })
        res.cookie('uid', response.data.token,{
            maxAge: 1000*60*60*24,
            secure: false,
            httpOnly: true,
            sameSite: 'lax'
        })
        res.status(response.status).json(response.data);
    }
    catch(err){
        res.status(500).json({error: 'Internal Server Error'})
    }
});

// 2. Course service
app.use('/api/course', async(req, res)=>{
    try {
       const response  = await axios({
        method: req.method,
        url: `${course_url}${req.originalUrl.replace('/api/course','')}`,
        data: req.body,
        params: req.query,
        headers:{
            'Content-Type':'application/json'
        }
       })
       res.status(response.status).json(response.data)
    } catch (error) {
       res.status(500).json({error:'Internal Server Error'}) 
    }
})

// 3. Enrollment service
app.use('/api/enroll', async(req, res)=>{
    try {
        const response = await axios({
            method: req.method,
            url: `${enroll_url}${req.originalUrl.replace('/api/enroll','')}`,
            data: req.body,
            params:req.query,
            headers:{
                'Content-Type':'application/json',
                Cookie:req.headers.cookie,
            }
        })
        res.status(response.status).json(response.data)
    } catch (error) {
        res.status(500).json({error:'Internal Server Error'})
    }
})


app.listen(5000, ()=>{
    console.log(`server is running at port 5000`)
})