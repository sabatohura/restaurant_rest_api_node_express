const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const asyncHander = require("../util/asyncHandler");
const errorResponse = require("../util/errorResponse");
const User = require("../model/user");
// const { sendTokenResponse } = require("./user");
const mailSender = require("../util/mailSender");
exports.confirmAccount = asyncHander(async (req, res, next) => {
  const decoded = jwt.verify(req.params.token, process.env.JWT_SECRET);
  const isExist = await User.findById(decoded.id);
  console.log(isExist);
  if (!isExist) {
    return next(
      new errorResponse(
        "token is invalid or account dose not exist. please try to register again",
        400
      )
    );
  } else {
    try {
      if (isExist.confirmed) {
        return next(new errorResponse("Account have confirmed before", 400));
      } else {
        const user = await User.findByIdAndUpdate(
          { _id: decoded.id },
          { confirmed: true }
        );
        if (user) {
          res.status(200).json({
            success: true,
            message: "congrats!!! your account is now confirmed",
          });
        }
      }
    } catch (error) {
      return next(
        new errorResponse("error accure while confirming your account", 400)
      );
    }
  }
});
//LOGIN
exports.login = asyncHander(async (req, res, next) => {
  //validating email and password not empty
  const { email, password, confirmed } = req.body;
  if (!email || !password) {
    return next(new errorResponse("please provide email and password", 400));
  }
  //validating email exist in databse
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new errorResponse("invalid credentials", 401));
  }
  //comparing enterd password with the one from database
  //const isExist = await user.comparePassord(password);
  // if (!isExist) {
  //   return next(new errorResponse("invalid credentails", 401));
  // }
  //  validating if account is confirmed account
  if (!user.confirmed) {
    return next(
      new errorResponse(
        "your account is not confirmed. please check your email and confirm it.",
        401
      )
    );
  }
  //sending jwt into cookie
  sendTokenResponse(user, 200, res);
});
const sendTokenResponse = (user, statusCode, res) => {
  token = user.getSignedJWT();
  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  //ENABLELING HTTPS ONLY IN PRODUCTION
  if (process.env.NODE_ENV === "production") {
    options.secure = true;
  }
  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    token,
  });
};