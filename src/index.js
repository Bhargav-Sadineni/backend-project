//require('dotenv').config({path:'./env'})
import dotenv from 'dotenv'

//import mongoose from 'mongoose'
//import { DB_NAME } from './constants';
import connectDB from './db/index.js';
import express from 'express'

import {app} from "./app.js"

dotenv.config({
     path: './.env'
     })

connectDB()
.then(()=>{
    app.listen(process.env.Port||8000,()=>{
        console.log(`server is running at port: ${process.env.PORT}`)
    })
})
.catch((err)=>{
    console.log("MONGODB connection failed:",err)
})
//1st approach directly inside index.js
/*
import express from 'express'*/
/*function connectDB(){

}

connectDB()*/
/*
const app=express()

;(async()=>{
    try{
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("error",()=>{
            console.log("err:",error);
            throw error
        })
        app.listen(process.env.port,()=>{
            console.log(`App is listening on port ${process.env.PORT}`)
        })
    }
    catch(error){
        console.error("Error:",error)
        throw
    }
})()


*/


