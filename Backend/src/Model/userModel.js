import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    OTP:{
         type:String,
         default:null
    },
    isVarify:{
        type:Boolean,
        default:false
    },
    phone:{
        type:Number,
        required:true
    }
},{timestamps:true})

const modelSchema = new mongoose.model('user',userSchema)

 export default modelSchema