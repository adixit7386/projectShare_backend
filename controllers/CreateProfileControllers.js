const customErrorHandler = require("../services/customErrorHandler");
const Profile = require("../models/Profile");
const CreateProfileControllers = async (req, res, next) => {
  if (req.user._id !== req.body.userId) {
    return next(
      customErrorHandler.unAuthorized(
        "you are not authorized to complete this action"
      )
    );
  }
  try {
    const profile = await Profile.create(req.body);
    const savedProfile = await profile.save();
    res.json(savedProfile).status(200);
  } catch (err) {
    return next(err);
  }
};
module.exports = CreateProfileControllers;
