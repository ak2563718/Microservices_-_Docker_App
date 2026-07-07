import { asyncHandler } from '../utils/asyncHandler.js';
import { AppError } from '../utils/AppError.js'
import { Auth } from '../models/auth.Model.js'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


export const authRegister = asyncHandler(async(req, res, next)=>{
    const { name, email, password } = req.body;
    if(!name || !email  ||!password){
        return next(new AppError('Please provide all required field' ,400))
    }
    const found = await Auth.findOne({email});
    if(found){
        return next(new AppError('User already Registered', 400))
    }
    const user = await Auth.create({
        name,
        email,
        password:await bcrypt.hash(password, 10)
    })
      const {password:_, ...safedata} = user.toObject()
    res.status(201).json({
        success:true,
        message:'User Registered successfully',
        user:safedata,
    })
})

export const authLogin = asyncHandler(async(req, res, next)=>{
    const {email, password} = req.body;
    if(!email || !password){
        return next(new AppError("Please provide both email and password", 400))
    }
    const user = await Auth.findOne({email})
    if(!user){
        return next(new AppError("Email not registered", 404))
    }
    const matched = await bcrypt.compare(password, user.password);
    if(!matched){
        return next(new AppError('Wrong password', 400))
    }
    const token = await jwt.sign({
        id:user._id,
        name:user.name,
        email:user.email,
        role:user.role,
    },process.env.SECRET_KEY)
    res.cookie('uid',token,{
        httpOnly:true,
        secure:false,
        sameSite:'lax',
        maxAge: 60 * 60 * 1000,
    })
    const { password:_,...safedata}= user.toObject()
    res.status(200).json({
        message:"User loggin successfully",
        success:true,
        user:safedata,
        token
    })
})

export const authLogout = asyncHandler(async(req, res, next)=>{
    const token = req.cookies.uid;
    if(!token){
        return next(new AppError("No token found", 401))
    }
    res.clearCookie('uid',{
        httpOnly:true,
        secure:false,
        sameSite:'lax'
    })
    res.status(200).json({
        success:true,
        message:"User logged out",  
    })
})

export const authSession = asyncHandler(async(req, res, next)=>{
    const token = req.cookies.uid;
    if(!token){
        return next(new AppError("No token found", 401))
    }
    const decode = await jwt.verify(token, process.env.SECRET_KEY)
    const id = decode.id;
    const user = await Auth.findById(id)
    if(!user){
        return next(new AppError("Invalid Token", 401))
    }
    const {password:_,...safedata}=user.toObject()
    res.status(200).json({
        message:"User logged in",
        user:safedata,
        success:true,
    })
})