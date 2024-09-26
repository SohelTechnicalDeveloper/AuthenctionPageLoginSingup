import userModel from '../Model/userModel.js';
import { Success, failure, login } from '../utils/responseWrapper.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import nodemailer from 'nodemailer'
import otpgenerator from 'otp-generator'

dotenv.config()


// Function to add a new user
export const addUser = async (req, res) => 
    {
    
        const OTP = Math.floor(100000 + Math.random() * 150000)
    try {
        // Log the request body (consider removing or securing this in production)
        
        const { name, email, password, address,userOTP } = req.body;

         
        // Input validation (this is just a basic example)
        if (!name || !email || !password || !address) 
        {
            return  res.status(400).send(failure(400, 'All fields are required.'));
        }

        // Check if the user already exists
        const existingUser = await userModel.findOne({ email });
           
        if (existingUser) 
        {
            return res.status(400).send(failure(400, 'Email already registered.'));
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the user
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true, // true for port 465, false for other ports
            auth: {
                user: 'sohelkhanp619@gmail.com',
                pass: 'innd luun zfhf bfbb'
            }      
        })

        //send OTP on Mail 
        const info = await transporter.sendMail({

            from:"sohelkhanp619@gmail.com",
            to:email,
            subject:"OTP",
            text: String(OTP),
            html:`<html> OTP bta de yar ${OTP} </html>`

        })
           
        
        if(info.messageId)
        {    
          const response = await userModel.create({
              name,
              email,
              password: hashedPassword, // Ensure the key matches your model
              address,
              OTP
            
          });
          res.status(201).send(Success(response));
       }
        
        // Send success response
    } catch (error) {
        console.error(error);

        // Handle specific errors as necessary
        res.status(500).send(failure(500, error.message || 'An error occurred.'));
    }
};

export const otpVarification = async (req,res)=>{

    const{userOTP} = req.body
    const response = await userModel.updateOne({OTP:userOTP},{$set:{isVarify:true}})

     res.status(200).send({msg:"Success",data:response})
}

export const userLogin = async (req,res)=>{
    try {
        
        const { email, password } = req.body;
        const response = await userModel.findOne({email,isVarify:true})
         if(response){
            
            //Compare password method by bcrypt
            const comparePassword = await bcrypt.compare(password,response.password)
            if(comparePassword)
            {
                let token = jwt.sign({response},process.env.SECRET_KEY,{expiresIn:"1h"})
                
                res.status(200).send(login(response,token))
            }
         }   
         
         else{
            res.status(401).send(failure("User not found"))
         }

        
    } catch (error) {

        res.send(failure(400,error))
        
    }

}

export const sendOtp = async (req,res)=>{

//  console.log(req.body);
    try {
           const {email} = req.body

          //send to user mail
         const otp = Math.floor(100000 + Math.random() * 100000)
         console.log(otp);

         const response = await userModel.findOne({email})
        //  console.log(response);
         
         if(!response)
          {
             res.status(400).send({msg:"user not found",status:"failed"})
           }
        else{

         let transporter = nodemailer.createTransport({

            host: "smtp.gmail.com",
            port: 465,
            secure: true, // true for port 465, false for other ports
            auth: {
                user: 'sohelkhanp619@gmail.com',
                pass: 'innd luun zfhf bfbb'
            }      
         })
         let info = await transporter.sendMail({
            from:'sohelkhanp619@gmail.com',
            to: email,
            subject:"OTP",
            text:String(otp),
            html:`<html> Jaldi se OTP bta ${otp} </html>`
         })         
            if(info.messageId)
            {
                
                let updateOtp  = await userModel.updateOne({email:email},{$set:{otp:otp}})
                if(updateOtp)
                {                    
                    return res.status(201).send({ msg: "User OTP Send successfully", status: "Success" });
                }
                else{
                    return res.status(400).send({ msg: "User OTP not updated", status: "failed" });

                }

            }
            else{
                res.status(400).send({msg:"server error",status:"failed"})
            }
    }
     }
     catch (error) {
        console.error(error); // Log the error for debugging
        return res.status(500).send({ msg: "Internal server error", status: "failed" });
    }
     
}


export const submitOTp = async (req,res)=>{

    try {
        const{password,otp} = req.body

        const response = await userModel.findOne({otp:otp})
         if(response)
          {
             const  hashedPassword = await bcrypt.hash(password,10)
            const updatePassword = await userModel.updateOne({otp:otp},{$set:{password:hashedPassword}})

            res.status(200).send({msg:"User Password update successfully",data:updatePassword})
         }
        //  else{
        //     res.status(400).send({msg:"User Password not update ",error})
        //  }        
    } catch (error) {
        res.status(400).send({msg:"Failed Update password",error})
    }
}