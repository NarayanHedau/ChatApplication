const UserController = require("../controller/userController")
const auth = require("../helper/auth")
const express = require("express")
const router = express.Router()

router.post("/register", UserController.userRegister)
router.post("/login", UserController.userLogin)
router.get("/", auth.verify, UserController.getAllUsers)
router.get("/search", UserController.searchUser)


module.exports = router