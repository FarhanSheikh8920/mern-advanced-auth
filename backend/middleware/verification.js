import jwt from 'jsonwebtoken'
export const verifyTokken = (req,resp,next)=>{
    const token = req.cookies.token;
    if(!token) return resp.status(401).json({success:false,message:"Unauthorizes - no token provided"})
        try {
    const decode = jwt.verify(token,process.env.JWT_SECRET)
    if(!decode) return resp.status(401).json({success:false,message:"Unauthorizes - invalid token"})
        
        
        req.userId = decode.userid;
   
        next();
    } catch (error) {
        console.log("error in verifytoken",error)
        resp.status(400).json({success:false,message:message.error})
    }
}