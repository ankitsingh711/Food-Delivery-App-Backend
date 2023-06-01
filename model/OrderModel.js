const mongoose = require("mongoose");
const Schema = require("mongoose");

const orderScehma = mongoose.Schema({
  user: { type: Schema.Types.ObjectId, ref: "UserModel" },
  restaurant: { type: Schema.Types.ObjectId, ref: "RestaurantModel" },
  items: [
    {
      name: String,
      price: Number,
      quantity: Number,
    },
  ],
  totalPrice: Number,
  deliveryAddress: {
    street: String,
    city: String,
    state: String,
    country: String,
    zip: String,
  },
  status: String,
});

const OrderModel = mongoose.model("orders", orderScehma);

module.exports = { OrderModel };
