import {asyncHandler} from "../utils/asyncHandler.js"
import {User} from "../models/user.model.js"
import {apiError} from "../utils/apiError.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { apiResponse } from "../utils/apiResponse.js"
const registerUser = asyncHandler( async (req,res)=>{
    // break down the problem into subproblems
    //get the details from frontend
    //validation - not empty
    //check if user already exists:using username,email
    //check for images, check for avator
    //upload them to cloudinary,avator
    //check multer has recieved anything
    //create user object - create entry in db
    //remove password and refresh token field from response
    //check for user creation
    //return res

    //console.log("req.body:",req.body)
    const {fullname,email,username,password}=req.body
    //console.log("email:",email)

    /*if(fullname===""){
        throw new apiError(400,"fullname is required")
    }*/

    if ([fullname,email,username,password].some((field)=>
        field?.trim()==="")
      ) {
        throw new apiError(400,"All fields are required")
    }

    const existedUser= await User.findOne({
        $or: [{ username },{ email }]
    })
    //console.log("existed user",existedUser)

    if(existedUser){
        throw new apiError(409,"User with email or username already exists")
    }

    //console.log("req.files:",req.files)
    const avatarLocalPath=req.files?.avatar?.[0]?.path
    const coverImageLocalPath=req.files?.coverImage?.[0]?.path
    //console.log("multer avathar:",avatarLocalPath)
    //console.log("coverImage avathar:",coverImageLocalPath)


    if (!avatarLocalPath) {
        throw new apiError(400,"avatar file is required after multer")
    }


    const avatar = await uploadOnCloudinary(avatarLocalPath)
    //console.log("avatar cloudinary response:",avatar)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)
    //console.log("coverImage cloudinary response:",coverImage)

    if(!avatar){
        throw new apiError(400,"Avatar file is required after cloudinary")
    }
    //console.log(req.files)


    const user = await User.create({
        fullname,
        avatar:avatar.url,
        coverImage:coverImage?.url||"",
        email,
        password,
        username:username.toLowerCase()

    })
    //console.log(user)

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!createdUser){
        throw new apiError(500,"Something went wrong while registering the user")
    }


    return res.status(201).json(
        new apiResponse(200,createdUser,"new user registered successfully")
    )

})

export {registerUser}