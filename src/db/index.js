import mongoose  from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
       try {
         const connectionInstance =  await mongoose.connect(`${process.env.MONGODB_URI}/  // After connection what is the response that we can hold in --> connectionInstance 
           ${DB_NAME}`)
         console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`)
       } catch (error) {
          console.log("MONGODB connection FAILED",error);
          process.exit(1)
       }
}


export default connectDB