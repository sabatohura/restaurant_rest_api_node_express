const mongoose = require("mongoose");

const Restorent = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Restorent name is required"],
    trim: true,
  },
  district: {
    type: String,
    required: true,
    trim: true,
  },
  sector: {
    type: String,
    required: true,
    trim: true,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "user",
    require: true,
  },
});
module.exports = mongoose.model("restorent", Restorent);
