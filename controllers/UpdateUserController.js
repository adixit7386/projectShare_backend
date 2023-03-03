const customErrorHandler = require("../services/customErrorHandler");
const User = require("../models/User");
const generateToken = require("../middleware/generateToken");

const updateUserController = async (req, res, next) => {
  let { image } = req.body;
  if (!image) {
    return next(
      customErrorHandler.incompleteData("send all the necessary details")
    );
  }

  try {
    let user;
    user = await User.findOneAndUpdate({ _id: req.user._id }, req.body, {
      new: true,
    });
    let { password, ...others } = user._doc;
    others.accessToken = generateToken(others._id, false);
    res.status(201).json(others);
  } catch (error) {
    return next(error);
  }
};

module.exports = updateUserController;
