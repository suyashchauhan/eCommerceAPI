const express = require("express");
const router = express.Router();

const { addProduct, getProduct,updateProduct,getSingleProduct } = require("../Controller/product");

router.route("/add").post(addProduct);
router.route("/").get(getProduct);
router.route("/:id").get(getSingleProduct).put(updateProduct);

module.exports = router;
