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
    const review = await reviewModel.create(req.body);
    res.status(200).json({ success: true, data: review });
  } catch (err) {
    res.status(500).json({ success: false, data: err });
  }
};

exports.updatereview = async (req, res, next) => {
  try {
    let review = await reviewModel.findById(req.params.id);
    if (!review) {
      res.status(404).json({ success: false, data: "No Review with that ID" });
    }
    if (review.user !== req.user.id) {
      res.status(404).json({ success: false, data: "Access Denied" });
    }
    review = await reviewModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ success: true, data: review });
  } catch (err) {
    res.status(300).json({ success: true, data: err });
  }
};
exports.deletereview = async (req, res) => {
  try {
    const review = await reviewModel.findByIdAndDelete(req.params.id);
    res.json({ success: true, data: review });
  } catch (err) {
    res.json({ success: true, data: err });
  }
};
