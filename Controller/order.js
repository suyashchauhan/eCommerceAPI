const order = require("../models/order");
exports.createOrder = async (req, res) => {
  const { orderItems, shippingAddress } = req.body;
  if (!orderItems || orderItems.length === 0) {
    res.status(400);
    return new Error("No order items");
  } else {
    order.create(
      {
        orderItems,
        user: req.user._id,
        shippingAddress,
      },
      (err, small) => {
        if (err) return new Error("Can't create order");
        res.status(200).json({ success: true, data: small });
      }
    );
  } 
};
