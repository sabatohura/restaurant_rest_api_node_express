const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = new mongoose.Schema({
  name: {
    type: String,
    require: [true, "please provide employee name is required"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please provide an email is required"],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please add a valid email",
    ],
  },
  password: {
    type: String,
    required: [true, "Please provide password is required"],
    minlength: 6,
    select: false,
  },
  confirmed: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
  createdDate: {
    type: Date,
    default: Date.now,
    required: true,
  },
});
//HASHING PASSWORD
User.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
//CREATING JWT
User.methods.getSignedJWT = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};
//PASSWORD COMPARE
User.methods.comparePassword = async function (enterdPassword) {
  return bcrypt.compare(enterdPassword, this.password);
};

//pass
module.exports = mongoose.model("user", User);
