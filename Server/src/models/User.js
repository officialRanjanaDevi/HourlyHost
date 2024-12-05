import mongoose from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import dotenv from "dotenv";
dotenv.configDotenv({
  path: ".env",
});

const userSchema=new mongoose.Schema({
    username:{
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
    address:{
        type:String,
    },
    profile:{
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
    latitude: {
        type: mongoose.Schema.Types.Decimal128,
        required: true,
    },
    longitude: {
        type: mongoose.Schema.Types.Decimal128,
        required: true,
    },
    location: {
        type: {
            type: String,
            enum: ['Point'], 
            required: true,
        },
        coordinates: {
            type: [Number], 
            required: true,
        },
    },
    refreshToken:{
        type:String
    }
},{timestamps:true})



userSchema.pre("save",async function(next) {
    if(!this.isModified("password")){
        return next();
    }
    this.password=await bcrypt.hash(this.password,10)
    next()
})

userSchema.methods.isPasswordCorrect=async function (password){
   return await bcrypt.compare(password,this.password)
}

userSchema.methods.generateAccessToken=function(){
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

userSchema.methods.generateRefreshToken=function(){
   
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

export const User= mongoose.model('User',userSchema);