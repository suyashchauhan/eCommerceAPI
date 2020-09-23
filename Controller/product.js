const productModel = require("../models/product");

exports.getProduct = async (req, res, next) => {
  try {
    const product = await productModel.find().populate("categoryid dealerId");

    res.status(200).json({ success: true, data: product });
  } catch (err) {
    res.status(404).send(err);
  }
};
exports.getSingleProduct = async (req, res, next) => {
  try {
    const product = await productModel.findById(req.params.id).populate("categoryid dealerId");
    res.status(200).json({ success: true, data: product });
  } catch (err) {
    res.status(404).send(err);
  }
};
exports.addProduct = async (req, res, next) => {
  try {
    const product = await productModel.create(req.body);
    res.status(200).json({ success: true, data: product });
  } catch (err) {
    res.status(404).json({ success: false, data: err.message });
  }
};
exports.updateProduct =   async (req,res,next)=>{
  try {
    const product = await productModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json({ success: true, data: product });
  } catch (err) {
    res.status(404).json({ success: true, data: err });
  }
}
