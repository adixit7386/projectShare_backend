const customErrorHandler = require("../services/customErrorHandler");
const User = require("../models/User");

const updateUserController = async (req, res, next) => {
  let { image } = req.body;
  if (!image) {
    return next(
      customErrorHandler.incompleteData("send all the necessary details")
    );
  }

  try {
    let user;
    user = await User.findOneAndUpdate({ userId: req.body.userId }, req.body, {
      new: true,
    });
    let { password, ...others } = user._doc;

    res.status(201).json(others);
  } catch (error) {
    return next(error);
  }
};

module.exports = updateUserController;
