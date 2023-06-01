const express = require("express");
const UserRouter = express.Router();
const { UserModel } = require("../model/UserModel");

UserRouter.post("/register", async (req, res) => {
  let { name, email, password, address } = req.body;
  try {
    const userDetails = new UserModel({ name, email, password, address });
    await userDetails.save();
    res.status(201).json({
      msg: "User Registered",
      user: userDetails,
    });
  } catch (error) {
    console.log(error);
  }
});

UserRouter.post("/login", async (req, res) => {
  let { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email, password });
    if (user) {
      res.status(201).json({
        msg: "Login Success",
      });
    } else {
      res.status(401).json({
        msg: "Wrong Credentials",
      });
    }
  } catch (error) {
    console.log(error);
  }
});

UserRouter.patch("/user/:id/reset", async (req, res) => {
  let userId = req.params.id;
  let { oldPassword, password } = req.body;
  try {
    const user = await UserModel.findById({ _id: userId });
    if (oldPassword === user.password) {
      user.password = password;
      user.save();
      res.status(204).json({
        msg: "Password Changed",
      });
    } else {
      res.status(401).json({
        msg: "Your Old Password is Wrong",
      });
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = { UserRouter };
