const personModel = require("../models/person");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const authorize = require("../middleware/authorize");
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
          expires: new Date(Date.now()+process.env.JWT_COOKIE_EXPIRE),
          httpOnly: true,
        })
        .json({ success: true, data: token });
    }
  },
];
exports.protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.token) {
    token = req.cookies.token;
  }
  if (!token) return next(new Error("couldn't extract token "));
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    req.user = await personModel.findById(decoded.id);
    next();
  } catch (err) {
    return next(err);
  }
};
exports.createCustomer = [
  this.protect,
  authorize("customer", "dealer", "admin"),
  async (req, res, next) => {
    try {
      req.body.role = "customer";
      const customer = await personModel.create(req.body);
      res.status(200).json({ success: true, data: customer });
    } catch (err) {
      res.status(404).json({ success: false, data: err });
    }
  },
];
exports.createadmin = [
  this.protect,
  authorize("admin"),
  async (req, res) => {
    try {
      req.body.role = "admin";
      const admin = await personModel.create(req.body);
      res.status(200).json({ success: true, data: admin });
    } catch (err) {
      res.status(404).json({ success: false, data: err });
    }
  },
];
exports.createdealer = [
  this.protect,
  authorize("dealer", "admin"),
  async (req, res) => {
    try {
      req.body.role = "dealer";
      const dealer = await personModel.create(req.body);
      res.status(200).json({ success: true, data: dealer });
    } catch (err) {
      res.status(404).json({ success: false, data: err });
    }
  },
];
