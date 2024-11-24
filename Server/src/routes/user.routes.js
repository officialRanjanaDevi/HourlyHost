import {Router} from "express"
import { signup,
    signin,
    signout,
    refreshAccessToken,
    changePassword,
    getCurrentUser,
    updateProfile,
    updateImage,
    viewAllAccount,
  viewAccount,
  deleteReview,
  addReview,
  addToFavourite,
  removeFromFavourite
} from "../controllers/user.controller.js"
import { upload } from "../middlewares/multer.js"
import { verifyJWT } from "../middlewares/verifyJWT.js"

const router = Router()

router.route("/signup").post(signup)  

router.route("/signin").post(signin) 

router.route("/signout").post(verifyJWT,signout) 
      
router.route("/refreshToken").post(verifyJWT,refreshAccessToken);

router.route("/changePassword").patch( verifyJWT,changePassword);

router.route("/getUser").get(verifyJWT, getCurrentUser);

router.route("/updateProfile").patch(verifyJWT, updateProfile);

router.route("/updateImage").patch(verifyJWT,upload.single('image'), updateImage);

router.route("/account").get(viewAllAccount)

router.route("/account/:id").get(viewAccount) //takes ID of account which user want to view

router.route("/review").post(verifyJWT,addReview)

router.route("/review/:id").delete(verifyJWT,deleteReview) //takes ID of review which user want to delete

router.route("/favourite/:id").post(verifyJWT,addToFavourite) //takes ID of partner(account) which user want to add in fav

router.route("/favourite/:id").delete(verifyJWT,removeFromFavourite) // takes ID of favourite which user want to remove

export default router