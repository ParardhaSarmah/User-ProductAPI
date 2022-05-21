const express = require("express");
const multer = require("multer");
const authToken = require("./../jwt");
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./data");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });
const userController = require("./../controllers/productController");
const router = express.Router();
router.route("/").get(authToken, userController.getAllProducts);
router
  .route("/")
  .post(authToken, upload.single("uploaded_file"), userController.addProducts);
module.exports = router;
