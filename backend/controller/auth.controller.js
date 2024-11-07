import bcryptjs from 'bcryptjs'
import crypto from 'crypto'

import { User } from "../models/user.model.js";
import { generateTokenandSetCookies } from "../utils/generateTokenandSetCookies.js";
import { sendverificationEmail, sendWelcomeEmail,sendForgotSuccesEmail,sendResetpassword} from "../Maintrap/email.js";
import bcrypt from 'bcryptjs/dist/bcrypt.js';


export const signup = async (req, resp) => {

    const { email, password, name } = req.body
    try {
        if (!email || !password || !name) {
            throw new Error("All fields are required");
        }
        const userAlreadyExits = await User.findOne({ email })
        if (userAlreadyExits) {
            return resp.status(400).json({ success: false, message: "User already exit" })
        }

        const VerifivcationToken = Math.floor(100000 + Math.random() * 900000).toString()

        const hashpasword = await bcryptjs.hash(password, 10)
        const user = new User({
            email,
            password: hashpasword,
            name,
            VerifivcationToken,
            VerifivcationTokenExpireAt: Date.now() + 24 * 60 * 60 * 1000 // 24 hourse
        })
        await user.save()
        generateTokenandSetCookies(resp, user._id);
        await sendverificationEmail(user.email, VerifivcationToken)
        //jwt 
        resp.status(201).json({
            success: true,
            message: "User succefully created",
            user: {
                ...user._doc,
                password: undefined,
            },
        })


    } catch (error) {
        resp.status(400).json({ success: false, message: error.message })
    }


}

export const verifyEmail = async (req, resp) => {

    const { code } = req.body;
    try {
        const user = await User.findOne({
            VerifivcationToken: code,
            VerifivcationTokenExpireAt: { $gt: Date.now() }

        })
        if (!user) {
            return resp.status(400).json({ success: false, message: "Invalid or expired varification code" })
        }

        user.isVerified = true
        user.VerifivcationToken = undefined
        user.VerifivcationTokenExpireAt = undefined
        await user.save();
        await sendWelcomeEmail(user.email, user.name)
       // console.log(resp)
        resp.status(200).json({

            success: true,
            message: "Email verifyed",
            user: {
                ...user._doc,
                password: undefined
            },
        })
    }catch (error) {
        console.log("error in Verification",error)
        resp.status(500).json({success:false,message:"Server Error"})
    }
}

export const login = async (req, resp) => {
    const {email,password} = req.body;
    try {
        const user = await User.findOne({email})
        if(!user){
            return resp.status(400).json({success:false,message:"Invalid credential"});
    
        }
        const isPasswordvalid = await bcryptjs.compare(password,user.password)
        if(!isPasswordvalid){
            return resp.status(400).json({success:false,message:"Invalid credential"})
        }
        generateTokenandSetCookies(resp,user._id)
        user.lastlogin=Date.now()
        await user.save();
        resp.status(200).json({

            success: true,
            message: "Login verifyed",
            user: {
                ...user._doc,
                password: undefined,
            },
        })



    } catch (error) {
        console.log("Error in login",error)
        resp.status(400).json({success:false,message:error.message})
    
    }
   
    
}

export const forgotpassword = async(req,resp)=>{
const {email} = req.body
try{
    
    const user = await User.findOne({email})
    if(!user){
        return resp.status(400).json({success:false,message:"User not found"})
    }
    // generate reset token
    const resetToken = crypto.randomBytes(20).toString("hex")
    const resetTokenExpireAt = Date.now()+1*60*60*1000; // stand for 1 hr
    
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpireAt = resetTokenExpireAt;
     await user.save();

// send email
await sendForgotSuccesEmail(user.email,`${process.env.CLINENT_URL}/reset-password/${resetToken}`)

resp.status(200).json({success:true,message:"password reset link send succcufully"})
}catch(error){
console.log("error in forgoting password",error);
resp.status(400).json({success:false,message:error.message})
}
}
export const resetpassword=async(req,resp)=>{
try {
    const {token} = req.params;
    const {password} = req.body;

    const user = await User.findOne({
        resetPasswordToken : token,
        resetPasswordExpireAt : {$gt: Date.now()}
    })
    if(!user){
        return resp.status(400).json({success: false, message:"Invalid or expired reset token"})
    }
    // update password
    const hashpasword= await bcryptjs.hash(password,10)
    user.password=hashpasword;
    user.resetPasswordToken=undefined,
    user.resetPasswordExpireAt=undefined,
    await user.save();


    await sendResetpassword(user.email)
    resp.status(200).json({success:true,message:"Password reset succesfull"})


} catch (error) {
    console.log("error in reset",error)
    resp.status(400).json({success:false,message:error.message})
}
}
export const logout = async (req, resp) => {
   resp.clearCookie("token");
   resp.status(200).json({success:true,message:"Logout Successful"})
}
export const checkAuth = async(req,resp)=>{
    const user = await User.findById(req.userId)//.select("-password") // it will remove or undifined password
    try {
        console.log(user)
        if(!user) return resp.status(400).json({success:false,message:"User not found"})
            resp.status(200).json({success:true,user })

    } catch (error) {
     console.log("Error in checkauth",error)
     resp.status(400).json({success:false,message:error.message})   
    }
}
