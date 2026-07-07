import mongoose from "mongoose";

const enrollSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Auth",
        required:true,
    },
    courseId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course",
        required:true,
    },
    enrollData:{
        type:Date,
        required:true,
    }
},{timestamps:true})

export const Enroll = mongoose.model('Enroll',enrollSchema)