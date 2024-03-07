// *** Using Promises***
const asyncHandler = (requestHandler) =>{
    (req,res,next) =>{
        Promise.resolve(requestHandler(req,res,next)).
        catch((err) => next(err))
    }
}

export {asyncHandler}


// const asyncHandler = () => {}
// const asyncHandler = (func) =>  () => {} // Higher Order Function
// const asyncHandler = (func) =>  async () => {} // Higher Order Function

// **** Using Try - Catch Wrapper Function
// const asyncHandler = (fn) =>  async (req,res,next) => {
//     try {
//         await fn(req,res,next)
//     } catch (error) {
//         res.status(err.code || 500).json({
//             success:false,
//             message:err.message
//         })
//     }
// }

