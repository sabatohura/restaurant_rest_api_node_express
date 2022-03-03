const jwt = require("jsonwebtoken");
const asyncHander = require("../util/asyncHandler");
const ErrorResponse = require("../util/errorResponse");
const User = require("../model/user");

//PROTECT ROUTES
exports.protected = asyncHander(async (req, res, next) => {
  let token;
  //getting token from headers
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  //getting token from cookies
  // else if(req.cookies.token){
  //     token = req.cookies.token;
  // }

  //MAKE SURE TOKEN EXIST
  if (!token) {
    return next(
      new ErrorResponse("you are not authorized to access this", 401)
    );
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    req.user = await User.findById(decoded.id);
    next();
  } catch (error) {
    return next(
      new ErrorResponse("you are not  authorized to access this route", 401)
    );
  }
});
exports.getMe = asyncHander(async (req, res, next) => {
  const logedUser = await User.findById(req.user.id);
  if (!logedUser) {
    return next(new ErrorResponse("user not logedIn", 401));
  }
  res.status(200).json({
    success: true,
    logedUser,
  });
});
exports.authorized = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorResponse(
          "your role is not authorized to access this route",
          403
        )
      );
    }
    next();
  };
};
