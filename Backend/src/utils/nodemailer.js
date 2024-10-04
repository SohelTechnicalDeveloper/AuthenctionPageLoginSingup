import nodemailer from 'nodemailer'

 export const otpgenerator = async (OTP,email)=>
{
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
        subject:"OTP And Password",
        text: String(OTP),
        html:`<html> OTP bta de yar ${OTP} </html>`

    })
}