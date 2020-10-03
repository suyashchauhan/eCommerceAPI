const mongoose = require("mongoose");
const ReviewModel = new mongoose.Schema({
  comment: {
    type: String,
    required: true,
    minlength: [8, "Please elaborate a little bit it will be great"],
  },
  rating: {
    type: Number,
    min: [1, "Rating must be atleast 1"],
    max: [10, "Rating must be atleast 10"],
  },
  user:{
    type:mongoose.Schema.Types.ObjectId,
    required:true,
    ref:'Person'
  }
});
module.exports = mongoose.model("Review", ReviewModel);
