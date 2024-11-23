import {Router} from "express"
import { signup,
    signin,
    signout,
    refreshAccessToken,
    changePassword,
    getCurrentUser,
    updateProfile,
    updateImage} from "../controllers/auth.controller.js"
import { upload } from "../middlewares/multer.js"
import { verifyJWT } from "../middlewares/verifyJWT.js"
const router = Router()

router.route("/signup").post(signup)  

router.route("/signin").post(signin) 

router.route("/signout").post(signout) 
      
router.route("/refreshToken").post(verifyJWT,refreshAccessToken);

router.route("/changePassword").patch( verifyJWT,changePassword);

router.route("/getUser").get(verifyJWT, getCurrentUser);

router.route("/updateProfile").patch(verifyJWT, updateProfile);

router.route("/updateImage").patch(upload.single('image'), updateImage);

export default router