const mongoose = require("mongoose");
const reviewModel = require("../models/review");

exports.getAllreviews = async (req, res) => {
  try {
    const data = await reviewModel.find({});
    res.status(200).json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, data: err });
  }
};
exports.getSinglereview = async (req, res) => {
  try {
    const review = await reviewModel.findById(req.params.id);
    res.status(200).json({ success: true, data: review });
  } catch (err) {
    res.status(500).json({ success: false, data: err });
  }
};
exports.Addreview = async (req, res) => {
  try {
    const review = await reviewModel.create({
      user: `${req.user._id}`,
      ...req.body,
    });
    res.status(200).json({ success: true, data: review });
  } catch (err) {
    res.status(500).json({ success: false, data: err });
  }
};

exports.updatereview = async (req, res, next) => {
  try {
    let review = await reviewModel.findById(req.params.id);
    if (!review) {
      return next(new Error("no Review with that ID"));
    }
    console.log(review.user.toString());
    if (review.user.toString() !== req.user.id) {
      return next(new Error("Access Denied"));
    }

    review = await reviewModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ success: true, data: review });
  } catch (err) {
    res.status(404).json({ success: true, data: err });
  }
};
exports.deletereview = async (req, res) => {
  try {
    let review = await reviewModel.findById(req.params.id);
    if (!review) {
      return next(new Error("no Review with that ID"));
    }
    if (review.user.toString() !== req.user.id) {
      return next(new Error("Access Denied"));
    }
    review = await reviewModel.findByIdAndDelete(req.params.id);

    res.status(200).json({ success: true, data: review });
  } catch (err) {
    res.status(404).json({ success: true, data: err });
  }
};
