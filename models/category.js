const mongoose = require("mongoose");
const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true,"Please add a name to category"],
    unique: true,
    trim: true,
  },
  photo:{
    type:String,
    default:'no-photo.jpg'
  }
});
module.exports = mongoose.model("Category", CategorySchema);
