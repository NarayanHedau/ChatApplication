const UserRouter = require("../Routes/userRoutes")
const chatRouter = require("../Routes/chatRoutes")


module.exports = function(app){
    app.use("/user", UserRouter)
    app.use("/chat", chatRouter)
}