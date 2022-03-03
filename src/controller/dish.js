const Dish = require("../model/dish");
const asyncHandler = require("../util/asyncHandler");
const errorHandler = require("../util/errorResponse");
exports.createDish = asyncHandler(async (req, res, next) => {
  const dish = await Dish.create(req.body);
  if (!dish) {
    return next(new errorHandler("can not create dish", 400));
  }
  res.status(201).json({
    message: "dish created",
    payload: dish,
  });
});
exports.findAllDishes = asyncHandler(async (req, res, next) => {
  const dish = await Dish.find({});
  if (!dish) {
    return next(new errorHandler("can not find any dish", 500));
  }
  res.status(200).json({
    message: "dish found",
    payload: dish,
  });
});
exports.findSingleDishes = asyncHandler(async (req, res, next) => {
  const dish = await Dish.findById(req.params.id);
  if (!dish) {
    return next(new errorHandler("can not find that dish", 400));
  }
  res.status(200).json({
    message: "dish found",
    payload: dish,
  });
});
exports.deleteDish = asyncHandler(async (req, res, next) => {
  const dish = await Dish.findByIdAndDelete(req.params.id);
  if (!dish) {
    return next(new errorHandler("can not delete that dish", 400));
  }
  res.status(200).json({
    message: "dish deleted",
    payload: [],
  });
});
exports.updateDish = asyncHandler(async (req, res, next) => {
  const dish = await Dish.findByIdAndUpdate({ _id: req.params.id }, req.body);
  if (!dish) {
    return next(new errorHandler("can not update that dish", 400));
  }
  res.status(200).json({
    message: "dish updated",
    payload: dish,
  });
});
