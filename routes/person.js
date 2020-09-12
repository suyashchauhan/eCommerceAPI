const express = require("express");
const router = express.Router();
const {
  createCustomer,
  login,
  createadmin,
  createdealer,
} = require("../Controller/person");

router.route("/add/customer").post(createCustomer);
router.route("/add/dealer").post(createdealer);
router.route("/add/admin").post(createadmin);

router.route("/login").post(login);
module.exports = router;
