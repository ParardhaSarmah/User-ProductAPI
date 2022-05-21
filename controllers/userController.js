const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("./../models/userModel");
exports.getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find();
    res.status(200).json({
      status: "Success",
      data: allUsers,
    });
  } catch (err) {
    res.status(404).json({
      status: "failed",
      msg: err,
    });
  }
};
exports.getUser = async (req, res) => {
  console.log(req.params.uname);
  try {
    const user = await User.findOne({ username: req.params.uname });
    if (user === null) {
      return res.status(400).json({
        status: "Not found!",
      });
    }
    res.status(200).json({
      status: "Success",
      data: user,
    });
  } catch (err) {
    res.status(404).json({
      status: "failed",
      msg: err,
    });
  }
};
exports.signup = async (req, res) => {
  try {
    const pwdHash = await bcrypt.hash(req.body.password, 10);
    req.body.password = pwdHash;
    const user = await User.create(req.body);
    const token = jwt.sign(
      { username: user.username, _id: user._id },
      process.env.ACCESS_TOKEN_SECRET
    );
    console.log(req.body);
    res.status(201).json({
      status: "success",
      data: user,
      accessToken: token,
    });
  } catch (err) {
    res.status(500).json({
      status: "failed",
      msg: err,
    });
  }
};
exports.login = async (req, res) => {
  // console.log(req);
  try {
    const user = await User.findOne({ username: req.body.username });
    if (user === null) {
      return res.sendStatus(400);
    }
    if (await bcrypt.compare(req.body.password, user.password)) {
      const token = jwt.sign(
        { username: user.username, _id: user._id },
        process.env.ACCESS_TOKEN_SECRET
      );
      res.status(200).json({
        status: "Success",
        accessToken: token,
      });
    } else {
      res.status(400).json({
        status: "Incorrect credentials",
      });
    }
  } catch (error) {
    res.status(404).json({
      status: "failed",
      msg: error,
    });
  }
};
