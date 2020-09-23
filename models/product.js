const mongoose = require("mongoose");
const dealerModel = require("./person");
const categoryModel = require("./category");
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    trim: true,
    required: [true, "Please add brand name"],
  },
  Description: {
    type: String,
    required: [true, "Please add a description"],
  },
  Price: {
    type: Number,
    min: 1,
    max: 1000000,
  },
  Quantity: {
    type: Number,
    min: 1,
    max: 10000,
  },
  categoryid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
    validate: {
      validator: function (v) {
        return new Promise(function (resolve, reject) {
          categoryModel
            .findById(v)
            .then((res) => {
              if (!res) reject(new Error("the category id is not available"));
              else {
                resolve(true);
              }
            })
            .catch((err) => reject(err));
        });
      },
    },
  },
  dealerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Person",
    required: true,
    validate: {
      validator: function (v) {
        return new Promise(function (resolve, reject) {
          dealerModel
            .findById(v)
            .then((res) => {
              if (!res) reject(new Error("the dealer id is not available"));
              else {
                resolve(true);
              }
            })
            .catch((err) => reject(err));
        });
      },
    },
  },
});
module.exports = mongoose.model("Product", productSchema);
