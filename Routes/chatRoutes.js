const ChatController = require("../controller/chatConroller")
const auth = require("../helper/auth")
const express = require("express")
const router = express.Router()


router.get("/", auth.verify, ChatController.getAllChatPersons)
router.get("/:receiverId", ChatController.getChatById)



module.exports = router