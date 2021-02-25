const mongoose = require("mongoose");
const CategoryModel = require("../models/category");
const path = require("path");

exports.getAllCategorys = async (req, res) => {
  try {
    const data = await CategoryModel.find({});
    res.status(200).json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, data: err });
  }
};
exports.getSingleCategory = async (req, res) => {
  try {
    const category = await CategoryModel.findById(req.params.id);
    if (category) res.status(200).json({ success: true, data: category });
    else res.status(404).json({ success: false, data: category });
  } catch (e) {
    console.err(err);
    res.status(500).json({ success: false, data: err });
  }
};
exports.AddCategory = async (req, res) => {
  try {
    const category = await CategoryModel.create(req.body);
    res.json({ success: true, data: category });
  } catch (err) {
    res.status(500).json({ success: false, data: err });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const category = await CategoryModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (category) res.status(200).json({ success: true, data: category });
    else res.status(404).json({ success: false, data: category });
  } catch (err) {
    res.status(300).json({ success: true, data: err });
  }
};
exports.deleteCategory = async (req, res) => {
  try {
    const category = await CategoryModel.findByIdAndDelete(req.params.id);
    if (category) res.status(200).json({ success: true, data: category });
    else res.status(404).json({ success: false, data: category });
  } catch (err) {
    res.json({ success: true, data: err });
  }
};
exports.Imageupload = async (req, res) => {
  try {
    const category = await CategoryModel.findById(req.params.id);
    if (!category) res.status(404).json({ success: false, data: category });

    if (!req.files) {
      res
        .status(400)
        .json({ success: false, data: "file is not uploaded at all " });
    } else {
      let categoryphoto = req.files.file;
      if (!categoryphoto.mimetype.startsWith("image")) {
        res
          .status(400)
          .json({ success: false, data: "the filetype is not image" });
      } else if (categoryphoto.size > process.env.MAX_FILE_SIZE) {
        res
          .status(400)
          .json({ success: false, data: "Max file size exceeded" });
      } else {
        categoryphoto.name = `photo_${req.params.id}${
          path.parse(categoryphoto.name).ext
        }`;
        categoryphoto.mv("./photos/" + categoryphoto.name);
        await CategoryModel.findByIdAndUpdate(req.params.id, {
          photo: categoryphoto.name,
        }, { useFindAndModify: false });
        res.status(200).json({
          message: "Done file upload",
          data: {
            name: categoryphoto.name,
            size: categoryphoto.size,
          },
        });
      }
    }
  } catch (err) {
    res.status(500).json({ success: false, data: err });
  }
};
 