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
exports.cancelOrder = async (req, res) => {
  const cancelledOrder = await order.findById(req.params.id);
  if (!cancelledOrder) {
    res.status(400);
    return new Error("No order with that id");
  } else {
    if (cancelledOrder.user.toString() !== req.user._id.toString()) {
      res.status(401).json({ success: false, mesg: "Unauthorized" });
    } else {
      await order.findByIdAndDelete(req.params.id);
      res
        .status(200)
        .json({ success: true, mesg: "the order has been cancelled" });
    }
  }
};
exports.payforOrder = async (req, res) => {
  const Order = await order.findById(req.params.id);
  if (!order) {
    res
      .status(404)
      .json({ success: false, mesg: "there is no order with that id " });
  } else {
    Order.isPaid = true;
    Order.PaidAt = new Date().getTime();
    await Order.save();
    res.status(200).json({ success: true, mesg: Order });
  }
};
