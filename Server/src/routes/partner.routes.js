import {Router} from "express"
import { createAccount,loginAccount ,logoutAccount,addPost,deletePost,viewReviews,viewPost} from "../controllers/partner.controller.js"
import { partnerVerifyJWT } from "../middlewares/partnerVerifyJWT.js";
const router=Router();

router.route("/createAccount").post(createAccount);

router.route("/login").post(loginAccount);

router.route("/logout").post(partnerVerifyJWT,logoutAccount);

router.route("/post").post(partnerVerifyJWT,addPost);

router.route("/post").get(partnerVerifyJWT,viewPost);

router.route("/post/id").delete(partnerVerifyJWT,deletePost);

router.route("/review").get(partnerVerifyJWT,viewReviews);

export default router;