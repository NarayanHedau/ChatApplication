const config = require("../config.json")
const jwt = require("jsonwebtoken")
const response = require("./response")

module.exports = {
    verify: async(req, res, next)=>{
        try {
            const header = req.headers.authorization;
            const token = header.split(" ")[1]
            const verifyToken =  jwt.verify(token, config.secretKey)
            if (verifyToken) {
                req["userId"]= verifyToken._id
                next()
            }else{
                response.errorMsgResponse(res, 400, "Unauthorized Access")
            }
        } catch (error) {
            response.errorMsgResponse(res, 500, "Default Internal server error")
        }
    }
}

