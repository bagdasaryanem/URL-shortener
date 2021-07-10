const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  uid: String,
  userName: String,
  password: String,
});

module.exports = mongoose.model("User", userSchema);
