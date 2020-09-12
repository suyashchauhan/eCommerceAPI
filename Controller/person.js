const personModel = require("../models/person");
const passport = require("passport")
const jwt= require('jsonwebtoken');
exports.login = [
  passport.authenticate("local"),
  async (req, res, next) => {
    if (!req.user)
      res.status(404).send({ success: false, data: "No user found" });
    else {
      const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
      });
      res
        .status(200)
        .cookie("token", token, {
          expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE),
          httpOnly: true,
        })
        .json({ success: true, data: token });
    }
  },
];

exports.createCustomer = async (req, res, next) => {
  try {
    req.body.role = "customer";
    const customer = await personModel.create(req.body);
    res.status(200).json({ success: true, data: customer });
  } catch (err) {
    res.status(404).json({ success: false, data: err });
  }
};

exports.createadmin = async (req, res) => {
  try {
    req.body.role = "admin";
    const admin = await personModel.create(req.body);
    res.status(200).json({ success: true, data: admin });
  } catch (err) {
    res.status(404).json({ success: false, data: err });
  }
};

exports.createdealer = async (req, res) => {
  try {
    req.body.role = "dealer";
    const dealer = await personModel.create(req.body);
    res.status(200).json({ success: true, data: dealer });
  } catch (err) {
    res.status(404).json({ success: false, data: err });
  }
};
