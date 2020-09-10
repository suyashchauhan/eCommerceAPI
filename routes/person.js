const express = require("express");
const router = express.Router();
const { createCustomer, login } = require("../Controller/person");
router.route("/add/customer").post(createCustomer);
router.route("/login").post(login);
module.exports = router;
