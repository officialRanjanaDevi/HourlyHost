import mongoose from "mongoose";

const reviewSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true

    },
    partner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Partner",
        required:true

    },
    comment:{
        type:String,
    },
    image:{
        type:String,
    },
    rating:{
        type:Number,
        required:true
    }
},{timestamps:true});

export const Review =mongoose.model('Review',reviewSchema)