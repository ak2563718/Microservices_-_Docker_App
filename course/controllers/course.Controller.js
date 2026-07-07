import { asyncHandler } from '../utils/asyncHandler.js';
import { AppError } from '../utils/AppError.js';
import { Course } from '../models/courseModel.js';


export const createCourse = asyncHandler(async(req, res, next)=>{
    const { title, description, teacher, price } = req.body;
    if(!title || !description ||!teacher || !price){
        return next(new AppError('Please provide all required field', 400))
    }
    const course = await Course.create({
        title,
        description,
        teacher,
        price
    })
    res.status(201).json({
        success:true,
        message:"Course created ",
        course
    })
})

export const getCourse = asyncHandler(async(req, res, next)=>{
    const course = await Course.find({})
    if(!course){
        return next(new AppError('Course not found', 404))
    }
    res.status(200).json({
        message:"Course found",
        success:true,
        course
    })
})

export const getCoursebyId = asyncHandler(async(req, res, next)=>{
    const id = req.params.id;
    const course = await Course.findById(id);
    if(!course){
        return next(new AppError('Course not found', 404))
    }
    res.status(200).json({
        success:true,
        message:'course found',
        course
    })
})

export const updateCourse = asyncHandler(async(req, res, next)=>{
    const { title, description, teacher, price } = req.body;
    if(!title && !description && !teacher && !price){
        return next(new AppError('Provide something to update', 400))
    }
    const updatedata={};
    if(title) updatedata.title = title;
    if(description) updatedata.description = description;
    if(teacher) updatedata.teacher = teacher;
    if(price) updatedata.price = price;
    const id = req.params.id;
    const course = await Course.findByIdAndUpdate(id, updatedata, {new:true});
    if(!course){
        return next(new AppError('No Course found', 404))
    }
    res.status(200).json({
        success:true,
        message:'Course updated successfully',
        course
    })

})

export const deleteCourse = asyncHandler(async(req, res, next)=>{
    const id = req.params.id;
    const course = await Course.findByIdAndDelete(id);
    if(!course){
        return next(new AppError('Course not found', 404))
    }
    res.status(200).json({
        success: true,
        message: 'Course Deleted Successfully',
        course
    })
})