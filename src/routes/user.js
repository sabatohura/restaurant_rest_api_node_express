const express = require("express");
const {
  protected,authorized
}=require("../middleware/auth")
const {
  findAllUsers,
  findSingleUser,
  updateUser,
  deleteUser,
  createUser,
} = require("../controller/user");
const router = express.Router();

router.route("/").get(protected,authorized("user"),findAllUsers).post(createUser);
router.route("/:id").get(protected,authorized("user"),findSingleUser).put(protected,authorized("user"),updateUser).delete(protected,authorized("user"),deleteUser);

module.exports = router;
