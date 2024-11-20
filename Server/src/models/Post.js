import mongoose from "mongoose"


const postSchema= new mongoose.Schema({
   partner:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Partner",
    required:true
   },
   post:{
        type:String,
    },
   caption:{
        type:String,
    },
    likes:{
        type:Number,
    } 
},{timestamps:true})

export const Post = mongoose.model('Post',postSchema)