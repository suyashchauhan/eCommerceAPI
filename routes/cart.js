const express = require("express");
const router = express.Router();
const { addtoCart, removeCart, getCartItems,emptyCart } = require("../Controller/cart");
const { protect } = require("../middleware/authorize");
router.route("/add").post(protect, addtoCart);
router.route("/:id/remove").get(protect,removeCart);
router.route("/").get(protect,getCartItems);
router.route("/").delete(protect,emptyCart);
module.exports = router;
