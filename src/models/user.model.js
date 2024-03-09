import mongoose,{Schema} from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const userSchema = new Schema(
    {
       username:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        index:true
       },
       email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
       },
       fullName:{
        type:String,
        required:true,
        trim:true,
        index:true
       },
       avatar:{
        type:String,  // cloudinary URL (we will use URL as avatar)
        required:true
       },
       coverImage:{
        type:String,  
        
       },
       watchHistory:[
        {
        type: Schema.Types.ObjectId,
        ref:"Video"
        }
       ],
       password:{
        type:String,
        required:[true,'Password is required']
       },
       refreshToken:{
        type:String
       }
    },
    { timestamps:true }
    
)

// **** PASSWORD ENCRYPTION BEFORE SAVING PASSWORD***
userSchema.pre("save", async function (next) {
       if(!this.isModified("password")) return next()  // if password not modified

       this.password = await bcrypt.hash(this.password,10)
       next()
})


// CUSTOM METHODS 
userSchema.methods.isPasswordCorrect = async function (password){
       return await bcrypt.compare(password,this.password)    // this.password = hashedPassword and password = MyPlainTextPassword
}

// Both access and refresh token are JWT token
// HOW TO GENERATE ACCESS TOKEN ?
userSchema.methods.generateAccessToken =  function (){
   return jwt.sign(
        {
             // PAYLOAD OR DATA
            _id: this_id,
            email:this.email,
            username: this.username,
            fullName:this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
    
// HOW TO GENERATE REFRESH TOKEN ?
userSchema.methods.generateRefreshToken =  function (){
    return jwt.sign(
        {
             // PAYLOAD OR DATA
            _id: this_id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}
    



export const User = mongoose.model("User",userSchema)