const personModel = require("../models/person");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const transporter = require("../config/nodmailer");
const crypto = require("crypto");
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

exports.forgotPassword = async (req, res, next) => {
  const user = await personModel.findOne({ _id: req.params.id });
  if (!user) {
    res.status(404).json({ success: false, data: "No user exists" });
    //return next(new Error("no user with that kind of id is available"));
  }
  const token = user.generatetoken();
  await user.save();
  try {
    const info = await transporter.sendMail({
      from: "King dracula", // sender address
      to: "suyashchauhan31@gmail.com", // list of receivers
      subject: "Password Reset", // Subject line
      text: `the token is ${token}`, // plain text body
    });
    res.status(200).json({ success: true, data: [user, info.messageId] });
  } catch (err) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();
    res.status(404).json({ success: false, data: ["Failed to send the email",err] });
  }
};
exports.resetPassword = async (req, res, next) => {
  const resetPassword = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");
    console.log(resetPassword);
  try {
    const user = await personModel.findOne({
      resetPasswordToken: resetPassword,
      resetPasswordExpire: { $gt: Date.now() },
    });
    user.password = req.body.password;
    user.resetPasswordExpire = undefined;
    user.resetPasswordToken = undefined;
    await user.save();
    res.status(200).json({success:true,data:user});
  } catch (err) {
    res.status(404).json({
      success: true,
      data:
        "either the token is not correct or the reset password date expires",
      err,
    });
  }
};
