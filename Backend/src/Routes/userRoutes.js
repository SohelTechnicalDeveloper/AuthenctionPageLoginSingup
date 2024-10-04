import express from 'express'
import {addUser,userLogin, sendOtp, submitOtp,otpVarification,updateUserPassword} from '../Controllers/userController.js'
const userRouter = express.Router()

userRouter.post('/register', addUser);
userRouter.post('/login',userLogin)
userRouter.post('/sendOtp',sendOtp)
userRouter.post('/submitOtp',submitOtp)
userRouter.patch('/otpVarification',otpVarification)
userRouter.patch('/updateUserPassword',updateUserPassword)

    
export default  userRouter

