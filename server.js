const express = require("express")
const bodyParser = require("body-parser")
require('dotenv').config()
const database = require("./helper/database")
const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.use(express.static('public'));

const indexRouter = require("./index/index");
indexRouter(app);
const http = require('http').Server(app)

const socket = require("./helper/socket")
socket(http)

database.connect()



http.listen(3000, ()=>{
    console.log("Server is running on 3000 port ");
})