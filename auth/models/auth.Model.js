import mongoose from 'mongoose'

const authSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        enum:['tutor','student'],
        default: 'student',
    }
},{timestamps:true})

export const Auth = mongoose.model('Auth', authSchema)