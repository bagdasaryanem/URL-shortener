const mongoose = require("mongoose");

const viewSchema = new mongoose.Schema({
  userId: String,
  urlCode: String,
});

module.exports = mongoose.model("View", viewSchema);
