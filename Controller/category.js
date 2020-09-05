const mongoose = require("mongoose");
const CategoryModel = require("../models/category");

exports.getAllBootcamps = async (req, res) => {
  CategoryModel.find({})
    .then((re) => res.send(re))
    .catch((err) => res.status(500).send(err));
};

exports.AddBootcamp = async (req, res) => {
  try {
    const category = await CategoryModel.create(req.body);
    res.send(category);
  } catch (e) {
    res.status(500).send(e);
  }
};
