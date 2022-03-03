const express = require("express");
const { protected, authorized } = require("../middleware/auth");
const {
  createDish,
  findAllDishes,
  findSingleDishes,
  updateDish,
  deleteDish,
} = require("../controller/dish");
const router = express.Router();

router
  .route("/")
  .get(findAllDishes)
  .post(protected, authorized("user"), createDish);
router
  .route("/:id")
  .get(findSingleDishes)
  .put(protected, authorized("user"), updateDish)
  .delete(protected, authorized("user"), deleteDish);
module.exports = router;
