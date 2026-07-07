import mongoose from 'mongoose';

export async function dbConnection(uri){
    mongoose.connect(uri)
    .then(()=>console.log('Db connected from auth'))
    .catch((err)=>console.error(err))
}