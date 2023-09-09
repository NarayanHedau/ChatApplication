module.exports = {
    successResponse : async(res, statusCode, messsage, data)=>{
        return res.status(statusCode).json({
            status: "Success",
            code: statusCode,
            messsage:messsage,
            data
        })
    },
    errorMsgResponse : async(res, statusCode, messsage, data)=>{
        return res.status(statusCode).json({
            status: "Failed",
            code: statusCode,
            messsage:messsage,
            data
        })
    },

    customErrorResponse : async(res, statusCode, messsage, error)=>{
        return res.status(statusCode).json({
            status: "Failed",
            code: statusCode,
            messsage:messsage,
            error
        })
    }
}