const express = require("express");
const { reset } = require("nodemon");
const router = express.Router();
const {
  createCustomer,
  login,
  createadmin,
  createdealer,
  forgotPassword,
  resetPassword,
} = require("../Controller/person");
const { authorize, protect } = require("../middleware/authorize");
router
  .route("/add/customer")
  .post(protect, authorize("customer", "dealer", "admin"), createCustomer);
router
  .route("/add/dealer")
  .post(protect, authorize("dealer", "admin"), createdealer);
router.route("/add/admin").post(protect, authorize("admin"), createadmin);
router.route("/:id/forgot").post(forgotPassword);
router.route("/reset/:token").post(resetPassword);
router.route("/login").post(login);
module.exports = router;
