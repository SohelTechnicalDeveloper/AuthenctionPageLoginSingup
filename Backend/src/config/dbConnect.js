 import mongoose from "mongoose";
 
  function dbConnect(URL) 
 {
     mongoose.connect(URL)
    console.log("dbConnect");
    
 }
    
 export default dbConnect