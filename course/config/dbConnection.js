import mongoose from 'mongoose';

export async function dbConnection(uri){
    await mongoose.connect(uri)
    .then(()=>console.log('Db connected with course..'))
    .catch((err)=>console.log(err))
}