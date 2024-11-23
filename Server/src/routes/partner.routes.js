import {Router} from "express"
import { createAccount,loginAccount ,logoutAccount,addPost,deletePost,viewReviews,viewPost} from "../controllers/partner.controller.js"

const router=Router();

router.route("/createAccount").post(createAccount);

router.route("/login").post(loginAccount);

router.route("/logout").post(logoutAccount);

router.route("/post").post(addPost);

router.route("/post").get(viewPost);

router.route("/post/id").delete(deletePost);

router.route("/review").get(viewReviews);

export default router;