const express = require("express");
const {
protected,authorized
}=require("../middleware/auth");
const {
  createRestorent,
  findAllRestorents,
  findSingleRestorent,
  updateRestorent,
  deleteRestorent,
} = require("../controller/restorent");

const router = express.Router();

router.route("/").get(findAllRestorents).post(protected,authorized("user"),createRestorent);
router
  .route("/:id")
  .get(findSingleRestorent)
  .put(protected,authorized("user"),updateRestorent)
  .delete(protected,authorized("user"),deleteRestorent);
module.exports = router;
