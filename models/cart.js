const mongoose = require("mongoose");
const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Person",
    },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  },
  { timestamps: true }
);
module.exports = mongoose.model("Cart", cartSchema);
