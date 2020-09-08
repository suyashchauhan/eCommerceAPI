const express = require("express");
const router = express.Router();
const {
  getAllreviews,
  getSinglereview,
  Addreview,
  updatereview,
  deletereview,
} = require("../Controller/review");
router.route("/").get(getAllreviews);
router.route("/add").post(Addreview);
router
  .route("/:id")
  .get(getSinglereview)
  .put(updatereview)
  .delete(deletereview);
module.exports = router;
