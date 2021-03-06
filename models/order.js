const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  orderItems: [
    {
      _id: false,
      qty: {
        type: Number,
        required: true,
      },
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
    },
  ],
  shippingAddress: {
    pincode: { type: String, required: true },
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
  invoice_id: {
    type: String,
  }
});
module.exports = mongoose.model("Order", orderSchema);
