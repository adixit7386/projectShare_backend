const jwt = require("jsonwebtoken");
const customErrorHandler = require("../services/customErrorHandler");
const verifyToken = async (req, res, next) => {
  if (!req.headers.authorization) {
    return next(customErrorHandler.unAuthorized("You are not authorized"));
  }
  const token = req.headers.authorization.split(" ")[1];

  const valid = await jwt.verify(token, process.env.JWT_SECRET);

  if (!valid) {
    return next(customErrorHandler).unAuthorized("Invalid token");
  }
  const { _id, isAdmin, ...others } = valid;
  req.user = { _id: _id };
  next();
};

module.exports = verifyToken;
