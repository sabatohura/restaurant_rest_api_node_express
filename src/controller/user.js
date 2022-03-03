const asyncHandler = require("../util/asyncHandler");
const errorResponse = require("../util/errorResponse");
const User = require("../model/user");
const mailSender = require("../util/mailSender");
exports.createUser = asyncHandler(async (req, res, next) => {
  const { email } = req.body;
  const isExist = await User.findOne({ email });

  // make sure email dose not exist then create new user and send email to validate new account
  if (isExist) {
    return next(
      new errorResponse("sorry! there is an account with email", 400)
    );
  } else {
    try {
      const user = await User.create(req.body);
      if (!user) {
        return next(new errorResponse("could not register an user", 400));
      }

      //SENDING JWT INTO COOKIE
      sendTokenResponse(user, 200, res);
      const confirmURL = `${process.env.APPLICATION_URL}/authentication/${token}`;

      await mailSender(req.body, confirmURL);
    } catch (error) {
      console.log("email sending error: " + error);
      return next(new errorResponse("could not send email", 500));
    }
  }
});
exports.findAllUsers = asyncHandler(async (req, res, next) => {
  const user = await User.find({});
  if (!user) {
    return next(new errorResponse("cant find Users", 500));
  }
  res.status(200).json({
    mesage: "all found",
    count: user.length,
    payload: user,
  });
});
exports.findSingleUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new errorResponse("cant find that user", 400));
  }
  res.status(200).json({
    mesage: "User found",
    count: user.length,
    payload: user,
  });
});
exports.updateUser = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate({ _id: req.params.id }, req.body);
  if (!user) {
    return next(errorResponse("could not update  User", 400));
  }
  res.status(200).json({
    message: "User updated ",
    payload: user,
  });
});
exports.deleteUser = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) {
    return next(errorResponse("could not delete that  User", 500));
  }
  res.status(200).json({
    message: "user deleted",
    payload: [],
  });
});
//METHOD TO SEND TOKEN RESPONCE
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
    message:
      "account successfuly created!!! please chech your Email to confirm your account",
    data: user,
    token,
  });
};
exports.sendTokenResponse = sendTokenResponse;
