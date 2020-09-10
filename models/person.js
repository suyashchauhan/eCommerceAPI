const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const personModel = new mongoose.Schema({
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
});

personModel.pre("save", async function (next) {
  // if (this.isNew) {
    try {
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
  return  await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("Person", personModel);
