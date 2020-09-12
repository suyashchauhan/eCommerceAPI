module.exports = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(new Error("You are not logged in "));
    }
    if (!roles.includes(req.user.role))
      return next(new Error("Not Authorized"));

    next();
  };
};

