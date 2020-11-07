const express = require("express");
const router = express.Router();
const {
  createOrder,
  cancelOrder,
  payforOrder,
  deliveredOrder
} = require("../Controller/order");
const { protect } = require("../middleware/authorize");
router.route("/add").post(protect, createOrder);
router.route("/cancel/:id").delete(protect, cancelOrder);
router.route("/:id/pay").put(protect, payforOrder);
router.route("/:id/deliver").put(protect, deliveredOrder);
module.exports = router;
