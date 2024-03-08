// USED FOR FILE UPLOADING 

import {v2 as cloudinary} from "cloudinary"
import fs from "fs" // File system(File Read , Write , Remove etc..) in Node js .... Here We are using to take File's Path to give to cloudinary to store in cloudinary


cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME , 
  api_key: process.env.CLOUDINARY_API_KEY , 
  api_secret: process.env.CLOUDINARY_SECRET
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
     if(!localFilePath) return null
     //upload the file on cloudinary
   const response =  await cloudinary.uploader.upload(localFilePath, {
         resource_type:"auto"
     })
     
     //File Has been uploaded successfully 
     console.log("File is Uploaded on Cloudinary",response.url);
      
     return response   // response to the user
  } catch (error) {
        fs.unlinkSync(localFilePath)  // remove the locally saved temporary file as the upload operation got failed
        return null;
  }
}

export {uploadOnCloudinary}
