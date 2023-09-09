const UserSchema = require("../Model/userModel")


exports.create = async(reqBody)=>{
    return UserSchema(reqBody).save()
}
exports.findAll = async(reqQuery)=>{
    return UserSchema.find(reqQuery)
}

exports.findOne = async(reqQuery)=>{
    return UserSchema.findOne(reqQuery)
}

exports.update = async(id, reqQuery)=>{
    return UserSchema.findByIdAndUpdate({_id:id}, {$set:reqQuery}, {new:true})
}