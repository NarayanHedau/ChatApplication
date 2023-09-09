
const GroupChatSchema =require("../Model/groupChatModel")

exports.create = async(reqBody)=>{
    return GroupChatSchema(reqBody).save()
}
exports.findAll = async(reqQuery)=>{
    return GroupChatSchema.find(reqQuery)
}

exports.findOne = async(reqQuery)=>{
    return GroupChatSchema.findOne(reqQuery)
}

exports.update = async(id, reqQuery)=>{
    return GroupChatSchema.findByIdAndUpdate({_id:id}, {$set:reqQuery}, {new:true})
}