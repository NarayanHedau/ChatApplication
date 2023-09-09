const mongoose = require("mongoose");
const UserServices = require("../services/userServices");
const Chatservices = require("../services/chatServices")
const response = require("../helper/response");

const getAllChatPersons = async(req, res)=>{
    try {
        const chatDetails = await Chatservices.findAll({senderId: req.userId})
        if (!chatDetails) {
            response.errorMsgResponse(res, 400, "Chat Details not Found!")
        }
        const ids = chatDetails.map(id=>id.receiverId)
        const result = await UserServices.findAll({_id:{$in:ids}})
        response.successResponse(res, 200, "Data fetched successfully", result)
    } catch (error) {
    response.errorMsgResponse(res, 500, "Default internal server error");   
    }
}

const getChatById = async(req, res)=>{
    try {
        const receiverId = req.params.receiverId
        const result = await Chatservices.findAll({receiverId:receiverId})
        response.successResponse(res, 200, "Data Fetched Successfully", result)
    } catch (error) {
    response.errorMsgResponse(res, 500, "Default internal server error");   
    }
}

module.exports = { getAllChatPersons, getChatById };
