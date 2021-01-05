const mongoose = require("mongoose");
const productModel = require("../models/product");
const cartModel = require("../models/cart");
exports.addtoCart = async (req, res, next) => {
  try {
    const { qty, productId } = req.body;
    let product = await productModel.exists({ _id: productId });

    if (!product) {
      res.status(404).json({ success: false, data: "no product with this id" });
    } else {
      product = { productId, qty };
      let cart = await cartModel.findOne({ userId: req.user._id });
      if (cart) {
        let flag = false;
        cart.products.find((o, i) => {
          if (o.productId + "" === productId) {
            cart.products[i].qty += qty;
            flag = true;
            return true;
          }
        });

        if (!flag)
          cart = await cartModel.findOneAndUpdate(
            { userId: req.user._id },
            { $push: { products: product } },
            { new: true, useFindAndModify: false }
          );
        else {
          await cart.save();
        }
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

exports.emptyCart = async (req, res, next) => {
  try {
    await cartModel.deleteOne({ userId: req.user._id });
    res.status(200).json({ success: true, mesg: "Cart emptied" });
  } catch (err) {
    res.status(400).json({ success: false, mesg: "user has no cart to empty" });
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
