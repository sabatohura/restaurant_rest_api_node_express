const express = require("express");
const { confirmAccount,login } = require("../controller/auth");
const router = express.Router();

router.route("/:token").get(confirmAccount);
router.route("/").post(login);
module.exports = router;

