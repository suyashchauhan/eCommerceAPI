const express = require("express");
const router = express.Router();
const { createOrder } = require("../Controller/order");
const { protect } = require("../middleware/authorize");
router.route("/add").post(protect, createOrder);
module.exports = router;
