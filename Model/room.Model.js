const mongoose = require("mongoose")

const RoomSchema = new mongoose.Schema({
    userId:{type:mongoose.Types.ObjectId, ref:"User"},
    roomId:{type:String, required:true}
}, {timestamps:true})

RoomModel = mongoose.model("Room", RoomSchema) 
module.exports = RoomModel