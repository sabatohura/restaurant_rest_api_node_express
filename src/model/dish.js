const mongoose = require("mongoose");

const Dish = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "dish name is required"],
    trim: true,
  },
  price: {
    type: Number,
    // required: [true, "dish price is required"],
    trim: true,
  },
  description: {
    type: String,
    // required: [true, "dish description is required"],
    trim: true,
  },
  photo: {
    type: String,
    // required: [true, "dish description is required"],

    trim: true,
  },
  restorentId: {
    type: mongoose.Schema.ObjectId,
    ref: "restorent",
  },
});
module.exports = mongoose.model("dish", Dish);
