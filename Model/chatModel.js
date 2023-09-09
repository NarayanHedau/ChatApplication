const mongoose = require("mongoose")

const ChatSchema = new mongoose.Schema({
    senderId:{type:mongoose.Types.ObjectId, ref:"User"},
    receiverId:{type:mongoose.Types.ObjectId, ref:"User"},
    message:{type:String, required:true},
}, {timestamps:true})

chatModel = mongoose.model("Chat", ChatSchema) 
module.exports = chatModel