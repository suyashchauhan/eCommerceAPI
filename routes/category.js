const express = require("express");
const router = express.Router();
const {
  getAllCategorys,
  AddCategory,
  updateCategory,
  getSingleCategory,
  deleteCategory,
  Imageupload
} = require("../Controller/category");

router.route("/").get(getAllCategorys);
router.route("/add").post(AddCategory);
router.route("/:id").put(updateCategory).get(getSingleCategory).delete(deleteCategory);
router.route("/update/:id").put(Imageupload);
module.exports = router;
