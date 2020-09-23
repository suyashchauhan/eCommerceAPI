const express = require("express");
const router = express.Router();
const { addtoCart } = require("../Controller/cart");
router.route("/:id/add").get(addtoCart);
module.exports = router;
