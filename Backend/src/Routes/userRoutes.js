import express from 'express'
import {addUser,userLogin, sendOtp, submitOTp,otpVarification} from '../Controllers/userController.js'
const userRouter = express.Router()

userRouter.post('/register', addUser);
userRouter.post('/login',userLogin)
userRouter.post('/sendOtp',sendOtp)
userRouter.patch('/submitOtp',submitOTp)
userRouter.patch('/otpVarification',otpVarification)

    
export default  userRouter

