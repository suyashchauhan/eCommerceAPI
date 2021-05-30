const order = require("../models/order");
const cartModel = require("../models/cart");
const axios = require("axios");
const person = require("../models/person");
const product = require("../models/product");
const stripe = require('stripe')(process.env.Stripe_secret_key)

exports.getOrder = async (req, res, next) => {
  try {
    const Order = await order.findById(req.params.id);
    if (Order) res.status(200).json({ success: true, data: Order });
    else res.status(404).json({ success: false, data: Order });
  } catch (e) {
    console.err(err);
    res.status(500).json({ success: false, data: err });
  }
}

exports.createOrder = async (req, res, next) => {
  try {
    const { shippingAddress } = req.body;
    let orderItems = await cartModel.findOne({ userId: req.user._id });
    orderItems = orderItems.products;
    if (!orderItems || orderItems.length === 0) {
      res.status(400);
      return next(new Error("No order items"));
    } else {
      const small = await order.create({
        orderItems,
        user: req.user._id,
        shippingAddress,
      });
      await axios.delete("http://localhost:5000/api/cart/", {
        headers: { Authorization: `Bearer ${req.cookies.token}` },
      });
      res.status(200).json({ success: true, data: small });
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
      if (cancelledOrder.isPaid)
        res
          .status(400)
          .json({ success: true, mesg: "the order is Paid so it can't be deleted or cancelled" });
      else {
        await order.findByIdAndDelete(req.params.id);
        res
          .status(200)
          .json({ success: true, mesg: "the order has been cancelled" });
      }
    }
  }
};
exports.payforOrder = async (req, res) => {
  const Order = await order.findById(req.params.id);
  // Check if order is exists or not 
  if (!order)
    res
      .status(404)
      .json({ success: false, mesg: "there is no order with that id " });

  else {
    if (!Order.isPaid) {
      // Order is not Paid 
      if (!Order.invoice_id) {
        // Order invoice is not yet generated  
        let newId = "";
        const stripeCustomer = await person.findById(Order.user).select('+stripeId')
        //create a new stripe customer if loggedin customer has not been assigned a stripe customer id 
        if (!stripeCustomer.stripeId) {
          newId = await stripe.customers.create({
            email: stripeCustomer.email,
            name: stripeCustomer.username,
            phone: stripeCustomer.phone
          })
          stripeCustomer.stripeId = newId.id
        }
        // Loop through all the cart items 
        for (let i = 0; i < Order.orderItems.length; i++) {
          const { Price, name, brand } = await product.findById(Order.orderItems[i]['productId'])
          await stripe.invoiceItems.create({
            quantity: Order.orderItems[i]['qty'], unit_amount: Math.round(Price), currency: 'inr', description: name + brand,
            customer: stripeCustomer.stripeId
          })
        }

        const invoice = await stripe.invoices.create({ customer: stripeCustomer.stripeId, collection_method: "send_invoice", days_until_due: 30 })
        stripe.invoices.sendInvoice(invoice.id, function (err, invoice) {
          if (err)
            res.send(err)
        });
        Order.invoice_id = invoice.id
        await Order.save();
        await stripeCustomer.save();
      }
      // send the payment url to the user
      const invoiceget = await stripe.invoices.retrieve(Order.invoice_id)
      res.status(200).json({ success: true, mesg: Order, pay_url: invoiceget.hosted_invoice_url });
    }
    else
      res.status(200).json({ success: true, mesg: "Already Paid" })

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
