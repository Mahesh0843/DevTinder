const mongoose= require("mongoose");
require('dotenv').config();
const connectDb= async() =>{
    try{
        await mongoose.connect
    }
    catch{
        console.error("MongoDb connection failed");
    }
}
module.exports=connectDb;