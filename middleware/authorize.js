const jwt = require("jsonwebtoken");
const personModel = require("../models/person");
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(new Error("You are not logged in "));
    }
    if (!roles.includes(req.user.role))
      return next(new Error("Not Authorized"));

    next();
  };
};
exports.protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.token) {
    token = req.cookies.token;
  }
  if (!token) return next(new Error("couldn't extract token "));
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    req.user = await personModel.findById(decoded.id);
    next();
  } catch (err) {
    return next(err);
  }
};
