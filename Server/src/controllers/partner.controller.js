// create account
// login
// logout
// add post
// delete post
// view reviews


import {Partner} from "../models/Partner.js";
import {Post} from  "../models/Post.js"
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Review } from "../models/Review.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js"


const generateAccessAndRefreshTokens = async (id) => {
  try {

    const partner = await Partner.findById(id);
    const accessToken = partner.generateAccessToken();
    const refreshToken = partner.generateRefreshToken();
     partner.refreshToken = refreshToken;
 
    await partner.save({ validateBeforeSave: false });
   
    return { accessToken, refreshToken };
  } catch (error) {
    console.log("Error while generating access token",error)
    throw new ApiError(
      500,
      "Something went wrong while generating access and refresh token"
    );
  }
};
const createAccount = asyncHandler(async (req, res) => {
  const {
    name,
    email,
    password,
    type,
    address,
    contact,
    city,
    state,
    pincode,
    lat,lon
  } = req.body;
  console.log(req.body)
  const registeredPartner = await Partner.findOne({email});

  if (registeredPartner) {
    throw new ApiError(400, "Already registered with this email.");
  }
 
  const newPartner = await Partner.create({
    name: name.toLowerCase(),
    email,
    password,
    type,
    contact,
    address: address.toLowerCase(),
    state: state.toLowerCase(),
    pincode,
    city: city.toLowerCase(),
    latitude:lat,
    longitude:lon,
    location: {
      type: "Point",
      coordinates: [parseFloat(lon), parseFloat(lat)],
  }

  });

  if (!newPartner) {
    throw new ApiError(
      500,
      "Server issue , Failed to create new Account. Please try again."
    );
  }
  const Account = await Partner.findById(newPartner._id).select(
    "-password -refreshToken"
  );
  return res
    .status(201)
    .json(new ApiResponse(201, Account, "Account created successfully!"));
});

const loginAccount=asyncHandler(async(req,res)=>{
    const {email,password} =req.body;
    const partner=await Partner.findOne({email})
    if(!partner){
        throw new ApiError("No account with this email");
    }
    const isPasswordValid = await partner.isPasswordCorrect(password);
    if (!isPasswordValid) {
      throw new ApiError(401, "Invalid credentials");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
        partner._id
      );
    const partnerAccount =await Partner.findById(partner._id).select("-password -refreshToken");
    if(!partnerAccount){
        throw new ApiError(500,"Server issue! Failed to logged in. Please try again.");
    }
    return res.status(200)
    .cookie("accessToken", accessToken, {
        maxAge:  24 * 60 * 60 * 1000,
    })
    .cookie("refreshToken", refreshToken,{
        maxAge:  10*24 * 60 * 60 * 1000,
    })
    .json(new ApiResponse(200,partnerAccount,"You are now logged in"))
})

const logoutAccount=asyncHandler(async(req,res)=>{
    const id = req.partner._id;
    await Partner.findByIdAndUpdate(
      id,
      { $unset: { refreshToken:1 } },
      { new: true }
    );
  
   
    return res
      .status(200)
      .clearCookie("accessToken")
      .clearCookie("refreshToken")
      .json(new ApiResponse(200, {}, "You are now logged out"));
})

const getAccountInfo=asyncHandler(async(req,res)=>{
    const id = req.partner._id;
  
    const account=await Partner.findById(id).select("-password -refreshToken -location -latitude -longitude");
    if(!account){
      throw new ApiError(400,"No such account exists")
    }
    return res.status(200).json(new ApiResponse(200, account, "Welcome back to your account"))
})

const addPost=asyncHandler(async(req,res)=>{
  const partner=req.partner
  const imagePath = req.file.path;
  const {caption}=req.body;
  let post;
  if (imagePath) {
    const imageUrl = await uploadOnCloudinary(imagePath);
    if (!imageUrl) {
      throw new ApiError(
        500,
        "Something went wrong while uploading image on Cloudinary"
      );
    }
    post = imageUrl.url;
   
  }
   const newPost=await Post.create({
    partner:partner._id,
    post,
    caption,
    likes:"0"
   })
  
   if(!newPost){
    throw new ApiError(500,"Server issue! Failed to post, please try again.")
   }
  return res
    .status(200)
    .json(new ApiResponse(200, newPost, "New post created successfully."));
})

const viewPost=asyncHandler(async(req,res)=>{
  const id=req.partner._id;
  const posts=await Post.find({partner:id});
  return res.status(200).json(new ApiResponse(200,posts,"Posts fetched successfully"))
})

const deletePost=asyncHandler(async(req,res)=>{
    
    const id=req.params;
    if(!id){
        throw new ApiError(400,"Unauthorized request to delete post.")
    }

    const post =await Post.findById(id);
    if(!post){
        throw new ApiError(400,"No such post exists with such ID")
    } 
    if(post.partner!==req.partner._id){
        throw new ApiError(400,"You are unauthorized to delete this post")
    }

    const deletedPost =await Post.findByIdAndDelete(post._id);
    if(!deletedPost){
        throw new ApiError(500,"Server issue! Failed to delete post ,please try again.")
    } 
    return res.status(200).json(new ApiResponse(200,deletedPost,"Post deleted successfully"))
})

const viewReviews=asyncHandler(async(req,res)=>{
   const reviews=await Review.find({partner:req.partner._id});
    return res.status(200).json(new ApiResponse(200,reviews,"Reviews of your service are as follows"))
})

export { createAccount,loginAccount ,logoutAccount,addPost,deletePost,viewReviews ,viewPost,getAccountInfo};
