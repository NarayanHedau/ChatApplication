const mongoose = require("mongoose");
const UserServices = require("../services/userServices");
const response = require("../helper/response");
const bcrypt = require("bcrypt");
const config = require("../config.json");
const jwt = require("jsonwebtoken");

const userRegister = async (req, res) => {
  try {
    const { email } = req.body;
    const findUser = await UserServices.findOne({ email: email });
    if (findUser) {
      response.successResponse(res, 409, "User Already Register");
    } else {
      let data = req.body;
      const addUser = await UserServices.create(data);
      if (addUser) {
        return response.successResponse(
          res,
          200,
          "User successfully registered",
          addUser
        );
      } else {
        return response.errorMsgResponse(
          res,
          400,
          "Default Internal server error"
        );
      }
    }
  } catch (error) {
    response.errorMsgResponse(res, 500, "Default internal server error");
  }
};

const userLogin = async (req, res) => {
  try {
    const { email } = req.body;
    const query = { email: email };
    let finduser = await UserServices.findOne(query);
    if (!finduser) {
      return response.errorMsgResponse(
        res,
        400,
        "Email is incorrect! Please enter correct email."
      );
    } else {
      finduser = JSON.parse(JSON.stringify(finduser));
      const token = jwt.sign(finduser, config.secretKey);
      console.log();
      finduser["token"] = `Bearer ${token}`;
      return response.successResponse(
        res,
        200,
        "User login successfully",
        finduser
      );
    }
  } catch (error) {
    response.errorMsgResponse(res, 500, "Default internal server error");
  }
};

const getAllUsers = async (req, res) => {
  try {
    const gerAllUsers = await UserServices.findAll({});
    if (gerAllUsers) {
      return response.successResponse(
        res,
        200,
        "User has been fetched successfully",
        gerAllUsers
      );
    }
  } catch (error) {
    response.errorMsgResponse(res, 500, "Default internal server error");
  }
};


const searchUser = async(req, res)=>{
  try {
    const query = {
      name: { $regex: "^" + req.query.name + "", $options: "i" }
    }
    const result = await UserServices.findAll(query);
    if (result) {
      return response.successResponse(
        res,
        200,
        "User has been fetched successfully",
        result
      );
    }
  } catch (error) {
    response.errorMsgResponse(res, 500, "Default internal server error");
  }
}
module.exports = { userRegister, userLogin, getAllUsers, searchUser };
