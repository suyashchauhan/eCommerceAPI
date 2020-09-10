const personModel = require("../models/person");
const passport = require("passport");
exports.login = [
  passport.authenticate("local"),
  async (req, res, next) => {
    if (!req.user)
      res.status(404).send({ success: false, data: "No user found" });
    else res.status(200).json({ success: true, data: req.user });
  },
];

exports.createCustomer = async (req, res) => {
  try {
    const customer = await personModel.create(req.body);
    res.status(200).json({ success: true, data: customer });
  } catch (err) {
    res.status(404).json({ success: false, data: err });
  }
};
