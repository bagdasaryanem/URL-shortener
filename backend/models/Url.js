const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
  urlName: String,
  urlCode: String,
  longUrl: String,
  userId: String,
});

module.exports = mongoose.model("Url", urlSchema);
