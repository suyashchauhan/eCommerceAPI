const order = require("../models/order");
const cartModel = require("../models/cart");
exports.createOrder = async (req, res, next) => {
  try {
    const { shippingAddress } = req.body;
    let orderItems = await cartModel.findOne({ userId: req.user._id });
    orderItems = orderItems.products;
    if (!orderItems || orderItems.length === 0) {
      res.status(400);
      return next(new Error("No order items"));
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
  } catch (e) {
    res.status(500).json({ success: false, err: e });
  }
};
exports.cancelOrder = async (req, res, next) => {
  const cancelledOrder = await order.findById(req.params.id);
  if (!cancelledOrder) {
    res.status(400);
    return next(new Error("No order with that id"));
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
    Order.Paidat = new Date().getTime();
    await Order.save();
    res.status(200).json({ success: true, mesg: Order });
  }
};
exports.deliveredOrder = async (req, res) => {
  const Order = await order.findById(req.params.id);
  if (!order) {
    res
      .status(404)
      .json({ success: false, mesg: "there is no order with that id " });
  } else {
    Order.isDelivered = true;
    Order.deliveredat = new Date().getTime();
    await Order.save();
    res.status(200).json({ success: true, mesg: Order });
  }
};
