const asyncHandler = require("../util/asyncHandler");
const errorHandler = require("../util/errorResponse");
const Restorent = require("../model/restorent");

exports.createRestorent = asyncHandler(async (req, res, next) => {
  const restorent = await Restorent.create(req.body);
  if (!restorent) {
    return next(errorHandler("could not create new Restorent", 500));
  }
  res.status(201).json({
    message: "resorent created",
    payload: restorent,
  });
});
exports.findAllRestorents = asyncHandler(async (req, res, next) => {
  const restorent = await Restorent.find({});
  if (!restorent) {
    return next("cant find Restorents", 500);
  }
  res.status(200).json({
    mesage: "all resorent found",
    count: restorent.length,
    payload: restorent,
  });
});
exports.findSingleRestorent = asyncHandler(async (req, res, next) => {
  const restorent = await Restorent.findById(req.params.id);
  if (!restorent) {
    return next("cant find that restorent", 400);
  }
  res.status(200).json({
    mesage: " restorent found",
    count: restorent.length,
    payload: restorent,
  });
});
exports.updateRestorent = asyncHandler(async (req, res, next) => {
  const restorent = await Restorent.findByIdAndUpdate(
    { _id: req.params.id },
    req.body
  );
  if (!restorent) {
    return next(errorHandler("could not update  Restorent", 400));
  }
  res.status(200).json({
    message: " Restorent updated",
    payload: restorent,
  });
});
exports.deleteRestorent = asyncHandler(async (req, res, next) => {
  const restorent = await Restorent.findByIdAndDelete(req.params.id);
  if (!restorent) {
    return next(errorHandler("could not delete that  Restorent", 500));
  }
  res.status(200).json({
    message: "Restorent deleted",
    payload: [],
  });
});
