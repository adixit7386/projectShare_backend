const Profile = require("../models/Profile");
const customErrorHandler = require("../services/customErrorHandler");
const AllUsers = async (req, res, next) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { description: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  try {
    const profiles = await Profile.find(keyword).find({
      userId: { $ne: req.user._id },
    });
    // const users = await User.find(keyword);

    res.json(profiles).status(201);
  } catch (err) {
    return next(err);
  }
};
module.exports = AllUsers;
