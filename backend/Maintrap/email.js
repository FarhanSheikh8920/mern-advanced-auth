import { client, sender } from "./mailtrap.confi.js"
import {VERIFICATION_EMAIL_TEMPLATE,PASSWORD_RESET_REQUEST_TEMPLATE,PASSWORD_RESET_SUCCESS_TEMPLATE} from './emailtempalte.js'



export const sendverificationEmail=async(email,VerifivcationToken)=>{
const recipient = [{email}]
try {
    const response = await client.send({
        from:sender,
        to:recipient,
        subject:"Verify you email",
        html:VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}",VerifivcationToken),
        category: "Email verification"
    })
    console.log("email sent successfuly",response)
} catch (error) {
    console.error(`error sending verification`)
    throw new Error(`error send varification email ${error}`)
}


}
export const sendWelcomeEmail=async(email,name)=>{
 const recipient = [{email}];
 try {
    
  
 const response =await client.send({
    from : sender,
    to : recipient,
    template_uuid: "796d787d-0ab9-4206-b793-ddb609e0254d",
    template_variables: {

        company_info_name: "Auth Company",
        name: name
    }

})
console.log("welcome email succefully ",response)
}
        catch (error) {
            throw new Error(`Error send welcome message ${error}`)
        }
}

export const sendForgotSuccesEmail = async(email,resetURL)=>{
const recipient = [{email}]
try {
    const response = await client.send({
        from:sender,
        to:recipient,
        subject:"Reset Password",
        html:PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}",resetURL),
        category: "Password Reset"
    })
    console.log("Send succesfully reset password",response)
} catch (error) {
    console.error("Error sending reset email",error)
    throw new Error(`Error sending reset email ${error}`)
}



}
export const sendResetpassword = async(email)=>{
    const recipient = [{email}];
   try{
       const response = await client.send({
           
           
           from : sender,
           to: recipient,
           subject : "Password reset Succefull",
           html : PASSWORD_RESET_SUCCESS_TEMPLATE,
           category : "password reset"
        })
        console.error(`Password reset email sent successfully`,response);
    } catch(error){
        console.error(`Error in sending email`,error)
        throw new Error(`Error in sending email ${error} `)
    } 

}