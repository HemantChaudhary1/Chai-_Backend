// USED FOR FILE UPLOADING 

import {v2 as cloudinary} from "cloudinary"
import fs from "fs" // File system(File Read , Write , Remove etc..) in Node js .... Here We are using to take File's Path to give to cloudinary to store in cloudinary


cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME , 
  api_key: process.env.CLOUDINARY_API_KEY , 
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
     if(!localFilePath) return null
     //upload the file on cloudinary
   const response =  await cloudinary.uploader.upload(localFilePath, {
         resource_type:"auto"
     })
     
     //File Has been uploaded successfully 
     //  console.log("File is Uploaded on Cloudinary",response.url);
      
     // Now unlink it or remove
       fs.unlinkSync(localFilePath)
      
     return response   // response to the user
  } catch (error) {
        fs.unlinkSync(localFilePath)  // remove the locally saved temporary file as the upload operation got failed
        return null;
  }
}

export {uploadOnCloudinary}

// import { v2 as cloudinary } from "cloudinary";
// import fs from "fs";

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET
// });

// const uploadOnCloudinary = async (localFilePath) => {
//   try {
//     if (!localFilePath) return null;

//     // Upload the file to Cloudinary
//     const response = await cloudinary.uploader.upload(localFilePath, {
//       resource_type: "auto"
//     });

//     // Log the entire Cloudinary response
//     // console.log("Cloudinary Response:", response);

//     // Check if the response contains a URL
//     if (!response || !response.url) {
//       console.error("Error: No URL in Cloudinary response");
//       return null;
//     }

//     // File has been uploaded successfully
//     console.log("File is Uploaded on Cloudinary", response.url);

//     return response; // Return the response to the user
//   } catch (error) {
//     // Remove the locally saved temporary file as the upload operation failed
//     fs.unlinkSync(localFilePath);
//     console.error("Error uploading to Cloudinary:", error);
//     return null;
//   }
// };

// export { uploadOnCloudinary };
