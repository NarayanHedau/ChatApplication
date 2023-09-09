const socketIO = require("socket.io");
const response = require("../helper/response");
const UserServices = require("../services/userServices");
const chatServices = require("../services/chatServices")
const GroupChatServives = require("../services/groupChatServices")
const RoomServices = require("../services/roomServices")

const auth = require("./auth");
const { default: mongoose } = require("mongoose");

let users = {};

module.exports = function (http) {
  const io = socketIO(http);

  io.on("connection", async function (socket) {
    console.log("A user Connected");
    console.log("SocketId is ", socket.id);

    socket.on("user_Connected", function (userData) {
    users[userData.userId] = socket.id;
    console.log(`users`, users);
    });

    // socket.on("online_status", async () => {
    //   const userId = Object.keys(users).find((key) => {
    //     console.log(">>>>>>>>>>users[key]", users[key]);
    //     console.log(">>>>>>>>>>socket.id", socket.id);

    //     users[key] === socket.id});
    //   console.log(">>>>>>>>>>>>user", userId);
    //   if (userId) {
    //     let updateStatus = await UserServices.findOne({ _id: userId });
    //     updateStatus.is_online = true;
    //     updateStatus.save();
    //   }
    // });

    socket.on('sendMessage', async (data) => {
      console.log('Received message:', users[data.receiverId]);
  
      // Save the message to the database
      await chatServices.create(data)
  
      // Emit the message to the sender
      socket.emit('private_message', {
        senderId: data.senderId,
        receiverId: data.receiverId,
        message: data.message,
      });
  
      // Emit the message to the receiver
      socket.to(users[data.receiverId]).emit('private_message', {
        senderId: data.senderId,
        receiverId: data.receiverId,
        message: data.message,
      });
    });


    socket.on("getMessages", async (data) => {
      const receiverId = data.receiverId; 
      const senderId = data.senderId
      try {
        const result = await chatServices.findAll({$or:[{ receiverId: receiverId, senderId:senderId }, { receiverId: senderId , senderId:receiverId }]});
        socket.emit("messagesList", result); 
      } catch (error) {
        console.error("Error while fetching messages:", error);
      }
    });


    // create and Join Room
    socket.on('join', async(data) => {
      const dataObj = {
        roomId:data.roomId,
        userId:data.userId
      }
      socket.join(data.roomId);
      console.log(">>>>>>dataObj", dataObj);
      await RoomServices.create(dataObj)
      console.log(`User joined room: ${data.roomId}`);
    });

    // create Group Chat
    socket.on('groupChat', async(data) => {
      const roomData = await RoomServices.findOne({userId:data.senderId, roomId:data.roomId})
      console.log(">>>>>>>>>>>>roomData", roomData);
      if (!roomData) {
        console.log(">>>>>>>if condition");
        return new Error("User notfound with specific room")
        //  response.errorMsgResponse(res, 404, "User notfound with specific room")
      }
      await GroupChatServives.create(data)
      io.to(data.roomId).emit('groupChat', data.message);

    });

    // get group chat
    socket.on('getRoomMessage', async(data) => {
      const result =await GroupChatServives.findAll({roomId:data.roomId})
      socket.emit('getRoomMessage', result);
    });


    socket.on("disconnect", async () => {
      // Remove the user information when they disconnect
      const userId = Object.keys(users).find((key) => users[key] === socket.id);
      if (userId) {
        let updateStatus = await UserServices.findOne({ _id: userId });
        updateStatus.is_online = false;
        updateStatus.save();
        delete users[userId];
        console.log(`User with ID ${userId} is now disconnected.`);
      }
    });
  });
};


