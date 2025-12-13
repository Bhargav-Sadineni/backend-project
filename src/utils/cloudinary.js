import {v2 as cloudinary} from "cloudinary"
import fs from "fs"
import dotenv from 'dotenv'

/*cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEYS, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});*/


   cloudinary.config({ 
        cloud_name: 'dweyraljg', 
        api_key: '572936335517762', 
        api_secret: 'ukzBc05zQfuqEUZOFwR6aFP-yHg' // Click 'View API Keys' above to copy your API secret
    });
    
    

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null
        console.log("before upload")
        //upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath)

        // file has been uploaded successfull
        //console.log("file is uploaded on cloudinary ", response.url);
        fs.unlinkSync(localFilePath)
        return response;

    } catch (error) {
        console.log("cloudinary upload failed:",error)
        fs.unlinkSync(localFilePath) // remove the locally saved temporary file as the upload operation got failed
        return null;
    }
}



export {uploadOnCloudinary}