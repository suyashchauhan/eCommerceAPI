const express = require("express");
const router = express.Router();
const { getAllBootcamps, AddBootcamp } = require("../Controller/category");

router.route("/").get(getAllBootcamps);
router.route("/add").post(AddBootcamp);

module.exports = router;
