
const RoomSchema =require("../Model/room.Model")

exports.create = async(reqBody)=>{
    return RoomSchema(reqBody).save()
}
exports.findAll = async(reqQuery)=>{
    return RoomSchema.find(reqQuery)
}

exports.findOne = async(reqQuery)=>{
    return RoomSchema.findOne(reqQuery)
}

exports.update = async(id, reqQuery)=>{
    return RoomSchema.findByIdAndUpdate({_id:id}, {$set:reqQuery}, {new:true})
}