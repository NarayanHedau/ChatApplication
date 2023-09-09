
const ChatSchema =require("../Model/chatModel")

exports.create = async(reqBody)=>{
    return ChatSchema(reqBody).save()
}
exports.findAll = async(reqQuery)=>{
    return ChatSchema.find(reqQuery)
}

exports.findOne = async(reqQuery)=>{
    return ChatSchema.findOne(reqQuery)
}

exports.update = async(id, reqQuery)=>{
    return ChatSchema.findByIdAndUpdate({_id:id}, {$set:reqQuery}, {new:true})
}