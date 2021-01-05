const mongoose = require("mongoose");
const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Person",
      required: true,
    },
    products: [
      {
        _id: false,
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        qty: { type: Number, required: true },
      },
    ],
  },
  { timestamps: true }
);
module.exports = mongoose.model("Cart", cartSchema);
