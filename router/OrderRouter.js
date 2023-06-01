const express = require("express");
const OrderRouter = express.Router();
const { OrderModel } = require("../model/OrderModel");

OrderRouter.post("/orders", async (req, res) => {
  let payload = req.body;
  try {
    const orders = new OrderModel(payload);
    orders.save();
    res.status(201).json({
      msg: "food ordered success",
    });
  } catch (error) {
    console.log(error);
  }
});

OrderRouter.get("/orders/:id", async (req, res) => {
  let orderId = req.params.id;
  try {
    const order = await OrderModel.findById({ _id: orderId });
    res.status(200).json({
      "Your Order": order,
    });
  } catch (error) {
    console.log(error);
  }
});

OrderRouter.patch("/orders/:id", async (req, res) => {
  let orderId = req.params.id;
  let status = req.body;
  try {
    await OrderModel.findOneAndUpdate({
      _id: orderId,
      $set: status,
      new: true,
    });
    res.status(204).json({
      msg: "Status Updated Success",
      newStatus: status,
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = { OrderRouter };
