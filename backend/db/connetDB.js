import mongoose from "mongoose";
export  const connetDB= async()=>{
   try {
 const con = await mongoose.connect(process.env.MONGO_URI)
    console.log(`MongoDB Connected : ${con.connection.host}`)
} catch (error) {
    console.log("erro connection :",error.message)
    process.exit(1) // 1 is failure , 0 status code is succes 
   } 
}