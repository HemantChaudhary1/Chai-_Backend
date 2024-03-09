import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js" 
import {User} from "../models/user.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler( async (req,res) =>{
          //step1: get user details from frontend
          //step2:-Validation like not empty,email correct syntax
          //step3:-Check if user already exists (We can check using username or email)
          //step4:-check for required files --> Here check for images and avatar
          //step5:-upload them to cloudinary -->check if avatar is uploaded or not successfully
          //step6:-create user object --> Create entry in db
          //step7:-remove password and refresh field from response
          //step8:-check for user creation --> if we have got null response or user have been created
          //step9:-return response

     //***step1: get user details from frontend
          const {username,email,password,fullName} =req.body
          console.log("email:",email);

    //***step2:-Validation like not empty,email correct syntax
        //   if(fullName === ""){
        //     throw new ApiError(400,"fullname is required")
        //   }
     //check for fields are empty or not
        if(
           [fullName,email,username,password].some( (field) => field?.trim() === "") 
        ){
             throw new ApiError(400,"All fields are required")
        }
      //check for email format is correct or not
  
  //***step3:-Check if user already exists (We can check using username or email)
      const existedUser = await User.findOne({
         $or:[{ username }, { email }]
       })
       
       if(existedUser){
        throw new ApiError(409,"User with username and email already exists")
       }
    
   //***step4:-check for required files --> Here check for images and avatar
      const avatarLocalPath = req.files?.avatar[0]?.path;  // this we get using multer and middleware which we have written before registerUser route
    //   const coverImageLocalPath = req.files?.coverImage[0]?.path;
      let coverImageLocalPath;    // check if coverImagePath is empty or not 
      if(req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0){
         coverImageLocalPath = req.files.coverImage[0].path
      }
      
    //   console.log("req.files:", req.files);
    //  console.log("avatarLocalPath:", avatarLocalPath); 
       //check for avatar because it is required
       if(!avatarLocalPath){
        throw new ApiError(400,"Avatar file is required");
       }

   //***step5:-upload them to cloudinary -->check if avatar is uploaded or not successfully
      const avatar = await uploadOnCloudinary(avatarLocalPath)
      const coverImage = await uploadOnCloudinary(coverImageLocalPath)
        
       //check if avatar is uploaded or not successfully
       if (!avatar) {
        const errorMessage = req.files?.avatar[0]?.originalname
          ? "Error uploading avatar file"
          : "Avatar file is required";
        throw new ApiError(400, errorMessage);
      }
   
        
   //***step6:-create user object --> Create entry in db
      const user = await User.create({
         fullName,
         avatar: avatar.url,
         coverImage: coverImage?.url || "",
         email,
         password,
         username: username.toLowerCase()
       })
       
      //remove password and refresh field from response
         const createdUser= await User.findById(user._id).select(       // In select all fields are by default selected , we use "-fieldName" to remove the field which we do not want to send in user response
            "-password -refreshToken"
         ) 
     //check for user creation --> if we have got null response or user have been created
        if(!createdUser){
            throw new ApiError(500,"Something went wrong while registering the user")
        }
    
  //***step9:-return response
       return res.status(201).json(
            new ApiResponse(200, createdUser, "User registered successfully")
       )
          

} )

export {registerUser}

