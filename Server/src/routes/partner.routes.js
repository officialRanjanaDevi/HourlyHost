import {Router} from "express"
import { createAccount,loginAccount ,logoutAccount,addPost,deletePost,viewReviews,viewPost,getAccountInfo} from "../controllers/partner.controller.js"
import { partnerVerifyJWT } from "../middlewares/partnerVerifyJWT.js";
import { upload } from "../middlewares/multer.js";
const router=Router();

router.route("/createAccount").post(createAccount);

router.route("/login").post(loginAccount);

router.route("/logout").post(partnerVerifyJWT,logoutAccount);

router.route("/accountInfo").get(partnerVerifyJWT,getAccountInfo);

router.route("/post").post(partnerVerifyJWT,upload.single('image'),addPost);

router.route("/post").get(partnerVerifyJWT,viewPost);

router.route("/post/id").delete(partnerVerifyJWT,deletePost);

router.route("/review").get(partnerVerifyJWT,viewReviews);

export default router;