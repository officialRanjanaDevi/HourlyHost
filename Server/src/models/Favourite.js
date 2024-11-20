import mongoose from "mongoose"


const favouriteSchema= new mongoose.Schema({
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
},{timestamps:true})

export const Favourite = mongoose.model('Favourite',favouriteSchema)