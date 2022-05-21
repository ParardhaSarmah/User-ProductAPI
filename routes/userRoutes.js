const express = require("express");
const userController = require("./../controllers/userController");
const router = express.Router();
const authToken = require("./../jwt");
router.route("/").get(authToken, userController.getAllUsers);
router.route("/signup").post(userController.signup);
router.route("/login").post(userController.login);
router.route("/:uname").get(authToken, userController.getUser);

module.exports = router;
