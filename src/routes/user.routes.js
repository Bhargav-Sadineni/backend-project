import { Router } from "express";
import { changeCurrentPassword, getCurrentUser, getUserChannelProfile, loginUser, logoutUser, refreshAccessToken, registerUser, updateAccountDetails, updateUserAvatar } from "../controllers/user.controllers.js";

import {upload} from "../middlewares/multer.middleware.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";
const router = Router()

router.route("/register").post(
    upload.fields([
        {
            name:"avatar",
            maxCount:1
        },{
            name:"coverImage",
            maxCount:1
        }
    ]),
    registerUser
)//why post


router.route("/login").post(loginUser)

// secured routes
router.route("/logout").post(verifyJWT , logoutUser)

router.route("/refresh-token").post(refreshAccessToken)

router.route("/change-password").post(verifyJWT, changeCurrentPassword)

router.route("/current-user").get(verifyJWT,
    getCurrentUser
)//why get
router.route("/update-account").patch(verifyJWT,
    updateAccountDetails
)//why we use patch

router.route("/avatar").patch(verifyJWT, upload.single("avatar"),updateUserAvatar)

router.route("/channel/:username").get(verifyJWT,
    getUserChannelProfile
)
//



//router.route("/history").get(verifyJWT,getWatchHistory)
export default router