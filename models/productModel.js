const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, default: null, unique: true, required: true },
    description: { type: String, default: null, required: true },
    quantity: { type: Number, default: 0, required: true },
    price: { type: Number, default: 0, required: true },
    _createdBy: { type: String, required: true },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
const Product = mongoose.model("Product", productSchema);
module.exports = Product;
