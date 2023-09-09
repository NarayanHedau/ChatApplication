const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    name:{type:String},
    email:{type:String},
    is_online:{type:Boolean, default:false}
}, {timestamps:true})

userModel = mongoose.model("User", UserSchema)

module.exports = userModel