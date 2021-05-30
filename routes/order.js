const express = require("express");
const router = express.Router();
const {
  getOrder,
  createOrder,
  cancelOrder,
  payforOrder,
  deliveredOrder
} = require("../Controller/order");
const { protect } = require("../middleware/authorize");
router.route("/:id").get(getOrder);
router.route("/add").post(protect, createOrder);
router.route("/:id/cancel").delete(protect, cancelOrder);
router.route("/:id/pay").put(protect, payforOrder);
router.route("/:id/deliver").put(protect, deliveredOrder);
module.exports = router;
