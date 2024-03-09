// Now We will make Router and Routes 
import { Router } from "express";
import { loginUser, logoutUser, registerUser } from "../controllers/user.controller.js";
import {upload} from "../middlewares/multer.middleware.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router()

router.route("/register").post(
    upload.fields([             // Middleware is injected here before registerUser
       {name:"avatar",
       maxCount:1
       },
       {
          name:"coverImage",
          maxCount:1
       }
    ]),
    registerUser
    )

router.route("/login").post(loginUser)

//SECURED ROUTES
router.route("/logout").post(verifyJWT,logoutUser)  // verifyJWT here is a middleware --> And the next in this middleware is used for the next method to call logoutUser

export default router