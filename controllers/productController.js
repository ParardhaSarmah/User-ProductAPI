const csv = require("csvtojson");
const Product = require("./../models/productModel");

exports.getAllProducts = async (req, res) => {
  try {
    const allProducts = await Product.find();
    res.status(200).json({
      status: "success",
      len: allProducts.length,
      data: allProducts,
    });
  } catch (err) {
    res.status(404).json({
      status: "failed",
      msg: err,
    });
  }
};
exports.addProducts = async (req, res) => {
  try {
    const dat = await csv().fromFile(req.file.path);
    dat.forEach((el) => {
      el._createdBy = req.user.username;
    });
    // console.log(dat[0]);
    const data = await Product.insertMany(dat);
    // console.log(data.length);
    res.status(200).json({
      status: "success",
      len: data.length,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      msg: error,
    });
  }
};
