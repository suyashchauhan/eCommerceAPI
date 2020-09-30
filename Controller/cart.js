const mongoose = require("mongoose");
const productModel = require("../models/product");
const cartModel = require("../models/cart");
exports.addtoCart = async (req, res, next) => {
  try {
    const product = await productModel
      .findById(req.params.id)
      .select("name brand Price Description");

    if (!product) {
      res.status(404).json({ success: false, data: "no product with this id" });
    } else {
      let cart = await cartModel.findOne({ userId: req.user._id });
      console.log(cart);
      if (cart) {
        cart = await cartModel.findOneAndUpdate(
          { userId: req.user._id },
          { $push: { products: product } },
          { new: true, useFindAndModify: false }
        );
      } else {
        cart = await cartModel.create({
          userId: req.user._id,
          products: product,
        });
      }
      res.status(200).json({ success: true, data: cart });
    }
  } catch (err) {
    res.status(404).send(err);
  }
};
exports.removeCart = async (req, res, next) => {
  try {
    const product = await productModel
      .findById(req.params.id)
      .select("name brand Price Description");
    console.log(product);

    if (!product) {
      res.status(404).json({ success: false, data: "no product with this id" });
    } else {
      let cart = await cartModel.findOne({ userId: req.user._id });
      if (cart) {
        cart = await cartModel.findOneAndUpdate(
          { userId: req.user._id },
          { $pull: { products: product._id } },
          { new: true, useFindAndModify: false }
        );
        res.status(200).json({ success: true, data: cart });
      } else {
        res
          .status(404)
          .json({ success: true, data: "no cart exists for this user" });
      }
    }
  } catch (err) {
    res.status(404).send(err);
  }
};
exports.getCartItems = async (req, res, next) => {
  try {
    const cart = await cartModel.find({ userId: req.user._id });
    res.status(200).json({ success: true, data: cart });
  } catch (err) {
    res.status(404).send(err);
  }
};
