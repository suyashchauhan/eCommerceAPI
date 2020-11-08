const express = require("express");
const router = express.Router();
const {
  getAllreviews,
  getSinglereview,
  Addreview,
  updatereview,
  deletereview,
} = require("../Controller/review");
const { protect, canaddornot } = require("../middleware/authorize");
router.route("/").get(getAllreviews);
router.route("/add").post(protect, canaddornot, Addreview);

router
  .route("/:id")
  .get(getSinglereview)
  .put(protect, updatereview)
  .delete(protect, deletereview);
module.exports = router;
