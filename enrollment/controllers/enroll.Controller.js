import { asyncHandler } from '../utils/asyncHandler.js'
import { AppError } from '../utils/AppError.js'
import { Enroll } from '../models/enroll.Model.js'
import jwt from 'jsonwebtoken'
import axios from 'axios'

export const enrollcourse = asyncHandler(async(req, res, next)=>{
    const { courseId } = req.body;
    const token = req.cookies.uid;
    if(!token){
        return next(new AppError('No token found', 401))
    }
    const decode = await jwt.verify(token, process.env.SECRET_KEY)
    const enroll = await Enroll.create({
        courseId:courseId,
        userId:decode.id,
        enrollData:Date.now(),
    })
    res.status(201).json({
        success:true,
        message:'course enrolled',
        enroll,
    })
})

export const getMycourse = asyncHandler(async(req, res, next)=>{
    const token = req.cookies.uid;
    if(!token){
        return next(new AppError('No token found', 401))
    }
    const decode = await jwt.verify(token, process.env.SECRET_KEY)
    const userId = decode.id;
    const enroll = await Enroll.findOne({userId})
    const courseId = enroll.courseId;
    const response = await axios.get(`http://localhost:5002/course/${courseId}`)
    if(!enroll){
        return next(new AppError('No course found', 404))
    }
    res.status(200).json({
        success:true,
        message:'course found',
        course: response.data,
    })

})