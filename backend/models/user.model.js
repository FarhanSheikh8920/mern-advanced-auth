import mongoose from "mongoose";
const userschema = new mongoose.Schema({
email:{
    type:String,
    required:true,
    unique: true
},
password:{
    type:String,
    required:true
},
name:{
    type:String,
    required:true
},
lastlogin:{
    type:Date,
    default: Date.now
},
isVerified:{
    type:Boolean,
    default:false
},
resetPasswordToken:String,
resetPasswordExpireAt:Date,
VerifivcationToken:String,
VerifivcationTokenExpireAt:Date

},{timestamps: true})//create and updated field will e authomatically added into the document 
export const User = mongoose.model('User',userschema) 