const mongoose  = require("mongoose")
require('dotenv')

exports.connect = async()=>{
try {
    const connectDatabase = await mongoose.connect("mongodb://127.0.0.1:27017/chatApp")
    if (connectDatabase) {
        console.log("Database connected successfully");
    }else{
        console.log("Unable to connect Database");
    }
} catch (error) {
    console.log(error);
}
}