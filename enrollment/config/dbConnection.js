import mongoose from "mongoose";

export async function dbConnection(uri) {
    await mongoose.connect(uri)
    .then(()=>console.log('Db Connected from enrollment'))
    .catch((err)=>console.log(err))
}