const mongoose = require("mongoose");

const userScehma = mongoose.Schema({
  name: String,
  email: String,
  password: String,
  address: {
    street: String,
    city: String,
    state: String,
    country: String,
    zip: String,
  },
});

const UserModel = mongoose.model("users", userScehma);

module.exports = { UserModel };
