const customErrorHandler = require("../services/customErrorHandler");

const Profile = require("../models/Profile");
const FetchSingleProfileControllers = async (req, res, next) => {
  try {
    let profile = await Profile.findOne({ userId: req.params.id });
    res.json(profile).status(200);
  } catch (err) {
    return next(err);
  }
};
module.exports = FetchSingleProfileControllers;
