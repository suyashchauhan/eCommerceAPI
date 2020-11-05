const express = require("express");
const router = express.Router();
const { createOrder,cancelOrder } = require("../Controller/order");
const { protect } = require("../middleware/authorize");
router.route("/add").post(protect, createOrder);
router.route("/cancel/:id").delete(protect, cancelOrder);
module.exports = router;
