const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  orderItem: {
    qty: {
      type: Number,
      required: true,
      ref: "",
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
  },
  shippingAddress: {
    postalcode: { type: String, required: true },
    city: { type: String, required: true },
    address: { type: String, required: true },
  },
  isPaid: {
    type: Boolean,
    required: true,
    default: false,
  },
  isDelivered: {
    type: Boolean,
    required: true,
    default: false,
  },
  Paidat: {
    type: Date,
  },
  deliveredat: {
    type: Date,
  },
});
module.exports = mongoose.model("Order", orderSchema);
