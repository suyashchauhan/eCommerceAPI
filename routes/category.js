const express = require("express");
const router = express.Router();
const {
  getAllCategorys,
  AddCategory,
  updateCategory,
  getSingleCategory,
  deleteCategory,
  Imageupload,
} = require("../Controller/category");
const { authorize, protect } = require("../middleware/authorize");
router.route("/").get(getAllCategorys);
router.route("/add").post(protect, authorize("admin"), AddCategory);
router
  .route("/:id")
  .put(protect, authorize("admin"), updateCategory)
  .get(getSingleCategory)
  .delete(protect, authorize("admin"), deleteCategory);
router.route("/update/:id").put(protect, authorize("admin"), Imageupload);
module.exports = router;
