const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const personModel = new mongoose.Schema({
  stripeId: {
    type: String,
    default: "",
    required: false,
    select: false,
  },
  firstname: {
    type: String,
    required: true,
    minlength: [2, "More than 2 characters"],
    maxlength: [20, "should be less than 20 characters"],
  },
  lastname: {
    type: String,
    required: true,
    minlength: [2, "More than 2 characters"],
    maxlength: [20, "should be less than 20 characters"],
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: [true, "Please add an Email"],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please add a valid email ",
    ],
  },
  role: {
    type: String,
    enum: ["customer", "admin", "dealer"],
    default: "customer",
  },
  password: {
    type: String,
    required: [true, "Please add a password"],
    minlength: 6,
    select: false,
  },
  phone: {
    type: Number,
    required: [true, "Please add a phone number"],
    match: [/^[0-9]{10,10}$/, "Please add a valid phone number"],
  },
  resetPasswordToken: {
    type: String,
    required: false,
  },
  resetPasswordExpire: {
    type: Date,
    required: false,
  },
});

personModel.pre("save", async function (next) {
  // if (this.isNew) {
  try {
    //console.log("haan yahan pe aaa araha hai ");
    const salt = await bcrypt.genSalt(10);
    // console.log("in the pre save hook " + this);
    this.password = await bcrypt.hash(this.password, salt);
  } catch (err) {
    return err;
  }
  // }
  //next();
});
personModel.methods.verifyPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

personModel.methods.generatetoken = function () {
  const resettoken = crypto.randomBytes(24).toString("hex");
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resettoken)
    .digest("hex");
  this.resetPasswordExpire = Date.now() + 60 * 10 * 1000; // 10 min expiration time
  return resettoken;
};

module.exports = mongoose.model("Person", personModel);
