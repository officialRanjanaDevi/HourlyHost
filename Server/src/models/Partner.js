import mongoose from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import dotenv from "dotenv";
dotenv.configDotenv({
  path: ".env",
});
const partnerSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        lowercase:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        index:true
    },
    password:{
        type:String,
        required:true,
        minlength: [4, 'Password length must be at least 4 characters'],
    },
    type:{
        type:String,
        enum: ['Cook','Maid','Electritian','Plumber',''],
        required:true,
    },
    address:{
        type:String,
    },
    profile:{
        type:String,
    },
    banner:{
        type:String,
    },
    contact:{
        type:Number,
        minlength: [10, 'Invalid contact number'],
    },
    city:{
        type:String,
    },
    state:{
        type:String,
    },
    pincode:{
        type:String
    },
    refreshToken:{
        type:String
    }
},{timestamps:true})



partnerSchema.pre("save",async function(next) {
    if(!this.isModified("password")){
        return next();
    }
    this.password=await bcrypt.hash(this.password,10)
    next()
})

partnerSchema.methods.isPasswordCorrect=async function (password){
   return await bcrypt.compare(password,this.password)
}

partnerSchema.methods.generateAccessToken=function(){
        return jwt.sign(
            {
                _id:this._id,
            },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn:process.env.ACCESS_TOKEN_EXPIRY
            }
        )
}

partnerSchema.methods.generateRefreshToken=function(){
   
    return jwt.sign(
        {
            _id:this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const Partner= mongoose.model('Partner',partnerSchema);