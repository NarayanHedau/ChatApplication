const mongoose = require("mongoose")

const GroupChatSchema = new mongoose.Schema({
    senderId:{type:mongoose.Types.ObjectId, ref:"User"},
    roomId:{type:String, required:true},
    message:{type:String, required:true},
}, {timestamps:true})

GroupChatModel = mongoose.model("GroupChat", GroupChatSchema) 
module.exports = GroupChatModel