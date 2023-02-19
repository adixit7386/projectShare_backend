const customErrorHandler = require("../services/customErrorHandler");
const Profile = require("../models/Profile");
const UpdateProfileControllers = async (req, res, next) => {
  if (req.user._id !== req.body.userId) {
    return next(
      customErrorHandler.unAuthorized(
        "you are not authorized to complete this action"
      )
    );
  }
  try {
    let user;
    user = await Profile.findOneAndUpdate(
      { userId: req.body.userId },
      req.body,
      {
        new: true,
      }
    );
    res.json(user).status(200);
  } catch (error) {
    return next(error);
  }
};
module.exports = UpdateProfileControllers;
