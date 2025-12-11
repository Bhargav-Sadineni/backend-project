import mongoose from 'mongoose'
import express from 'express'
import { DB_NAME } from '../constants.js';


//why async because DB in another continent takes time
const connectDB=async()=>{
    try{
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`\n MongoDB connected !! DB Host:${connectionInstance.connection.host}`)

    }catch(error){
        console.log("MONGODB connection failed:",error)
        process.exit(1)
    }
}

export default connectDB