import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/User.js";
import { Partner } from "../models/Partner.js";
import {Review} from "../models/Review.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const generateAccessAndRefreshTokens = async (userId) => {
  try {

    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
     user.refreshToken = refreshToken;
 
    await user.save({ validateBeforeSave: false });
   
    return { accessToken, refreshToken };
  } catch (error) {
    console.log("Error while generating access token",error)
    throw new ApiError(
      500,
      "Something went wrong while generating access and refresh token"
    );
  }
};

const signup = asyncHandler(async (req, res) => {
  // get user details from frontend
  // check if email is unique or not means duplicate user
  // create a new user object and post it on db
  // check if user is created or not by seraching it through id
  // remove the password and refresh token before sending userdata in response
  // if user created then return success

  const { username, email, password, address,state,pincode,city,lat,lon } = req.body;
  const existedUser = await User.findOne({ email });
  if (existedUser) {
    throw new ApiError(409, "User already exists with same email");
  }

  const user = await User.create({
    username: username.toLowerCase(),
    email,
    password,
    address,
    state,
    pincode,
    city,
    latitude:lat,
    longitude:lon,
    location: {
      type: "Point",
      coordinates: [parseFloat(lon), parseFloat(lat)],
  },
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  if (!createdUser) {
    throw new ApiError(500, "Failed to create user ,Please try again");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User registered successfully"));
});

const signin = asyncHandler(async (req, res) => {
  // access login details from req.body
  // check if email and password match with any of the details in db
  // if user found then generate access token and refresh token
  // find user by user id becoz we have updated refresh token in db
  // send accesstoken and refresh token  in form of cookies
  // return response sccess

  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(404, "User does not exist");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid user credentials");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    user._id
  );

  const loggedInUser = await User.findById(user._id)

  return res
    .status(200)
    .cookie("accessToken", accessToken, {
        maxAge:  24 * 60 * 60 * 1000,
    })
    .cookie("refreshToken", refreshToken,{
        maxAge:  10*24 * 60 * 60 * 1000,
    })
    .json(
      new ApiResponse(
        200,
        { user: loggedInUser, accessToken, refreshToken },
        "User logged in sccessfully"
      )
    );
});

const signout = asyncHandler(async (req, res) => {
  // get user id from request which we added in verifyjwt middleware
  // remove cookies from the  server
  // send response

  const id = req.user._id;
  await User.findByIdAndUpdate(
    id,
    { $unset: { refreshToken:1 } },
    { new: true }
  );

 
  return res
    .status(200)
    .clearCookie("accessToken")
    .clearCookie("refreshToken")
    .json(new ApiResponse(200, {}, "User logged out"));
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  // after expiry of access token user has to login again so to avoid user login
  // we are hitting this end point to refersh access token through refresh token which is saved in database and cookies
  // access refersh token from cookies
  // decode id from refersh token  using refersh secret
  // find user in db by id
  // if user found then match the incoming refersh token with db refersh token
  // if matched then regenerate access token and refersh token and send it in cookies

  const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;
  
  if (!incomingRefreshToken) {
    throw new ApiError(401, "unauthorized request");
  }

  try {
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );
    const user = await User.findById(decodedToken?._id);
    if (!user) {
      throw new ApiError(401, "Invalid refresh token");
    }
    if (incomingRefreshToken !== user?.refreshToken) {
      throw new ApiError(401, "Refresh token is expired or used");
    }
     
    const { accessToken, refreshToken } =await generateAccessAndRefreshTokens(user._id);
  
    return res
      .status(200)
      .cookie("accessToken", accessToken, {
         maxAge:  24 * 60 * 60 * 1000,
      })
      .cookie("refreshToken", refreshToken,{
        maxAge:  10*24 * 60 * 60 * 1000,
      })
      .json(
        new ApiResponse(
          200,
          { accessToken,refreshToken },
          "Access token refreshed"
        )
      );
  } catch (error) {
    throw new ApiError(400, error?.message || "Invalid refresh token");
  }
});

const changePassword = asyncHandler(async (req, res) => {
  // fetch user password from req.body
  // check if user exists or not
  // check if oldpassword is valid or not
  // update password
  // return response

  const { oldPassword, newPassword } = req.body;

  const user = await User.findById(req.user?.id);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);
  if (!isPasswordCorrect) {
    throw new ApiError(400, "Invalid old password");
  }

  user.password = newPassword;
  await user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResponse(200, "Password changed successfully"));
});

const getCurrentUser = asyncHandler(async (req, res) => {
 
  return res
    .status(200)
    .json(new ApiResponse(200, req.user, "Current user fetched successfully hello 123"));
});

const updateProfile = asyncHandler(async (req, res) => {
  const user = req.user;
  const data = req.body;
  const updatedUser = await User.findByIdAndUpdate(
    user._id,
    { ...data },
    { new: true }
  ).select("-password -refreshToken");

  return res
    .status(200)
    .json(new ApiResponse(200, updatedUser, "Profile updated successfully"));
});

const updateImage= asyncHandler(async(req,res)=>{
  const user=req.user
  const imagePath = req.file.path;
 let profile;
  if (imagePath) {
    const imageUrl = await uploadOnCloudinary(imagePath);
    if (!imageUrl) {
      throw new ApiError(
        500,
        "Something went wrong while uploading image on Cloudinary"
      );
    }
    profile = imageUrl.url;
   
  }
  const updatedUser = await User.findByIdAndUpdate(
    user._id,{profile},    
    { new: true }
  ).select("-password -refreshToken");

  return res
    .status(200)
    .json(new ApiResponse(200, updatedUser, "Profile image updated successfully"));
})

const viewAllAccount=asyncHandler(async(req,res)=>{
  const type=req.params||"Chef"
  console.log("hello")
  const arr=await Partner.find({});
  console.log("arr is" ,arr);
  const accounts=await Partner.aggregate([
    { $match: { type: type } },
    {$lookup:{
      from:"reviews",
      localField:"_id",
      foreginField:"partner",
      as:"ratings",
    }},
    {$addFileds:{
      avgRating:{
        $cond:{
          if:{$gt:[{$size:"ratings"},0]},
          then:{$avg:"$ratings.rating"},
          else:Null
        }
      }
    }},
    {$project:{ratings:0}}
  ]);
  console.log(accounts)
  return res.status(200).json(new ApiResponse(200,accounts,"Accounts are fetched"))
})

const viewAccount=asyncHandler(async(req,res)=>{
   const id=req.params
   const account=await Partner.aggregate([
    {match:{_id:id}},
    {
      $lookup:{
        from:"posts",
        localField:"_id",
        foreginField:"partner",
        as:"owner",
        
      },
      
    },
    {
      $lookup:{
        from:"reviews",
        localField:"_id",
        foreginField:"partner",
        as:"reviews"
      }
    }
   ])

   return res.status(200).json(new ApiResponse(200,account,"Account fetched successfully"))
})

const deleteReview=asyncHandler(async(req,res)=>{
   const id=req.params

   const review=await Review.findById(id);
   if(!review){
    throw new ApiError(400,"No such review exist with such ID");
   }
   if(review.user!==req.user._id){
    throw new ApiError(400,"Unauthorized to delete this review")
   }
   const deletedReview=await Review.findByIdAndDelete(review._id);
   if(!deleteReview){
    throw new ApiError(500,"Server issue! Failed to delete review, please try again.")
   }
   return res.status(200).json(new ApiResponse(200,deletedReview,"Review deleted successfully"))
})

const addReview=asyncHandler(async(req,res)=>{
  const {partner,comment,rating}=req.body
  const imagePath = req.file.path;
  let image;
   if (imagePath) {
     const imageUrl = await uploadOnCloudinary(imagePath);
     if (!imageUrl) {
       throw new ApiError(
         500,
         "Something went wrong while uploading image on Cloudinary"
       );
     }
     image = imageUrl.url;
    
   }
   const review=await Review.create({
    user:req.user._id,
     partner,
     comment,
     rating,
     image
   })
  return res.status(200).json(new ApiResponse(200,review,"Review added successfully"))
})

//add to favourite
//remove from fav
//sort accounts based on user location

const addToFavourite=asyncHandler(async(req,res)=>{
   const id=req.params;
   const partner=await Partner.findById(id);
   if(!partner){
    throw new ApiError(400,"No such account exits.")
   }
   const favourite=await Favourite.create({
      user:req.user._id,
      partner:id
   })
   if(!favourite){
    throw new ApiError(500,"Server issue,Failed to add in favourites , please try again.")
   }
   return res.status(200).json(new ApiResponse(200,favourite,"Added to your favourites list"))
})

const removeFromFavourite=asyncHandler(async(req,res)=>{
  const id=req.params;
  
  const favourite=await Favourite.findByIdAndDelete({partner:id})
  if(!favourite){
   throw new ApiError(400,"No such account exists")
  }
  return res.status(200).json(new ApiResponse(200,favourite,"Account remove from your favourites list"))
})
export {
  signup,
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
};
