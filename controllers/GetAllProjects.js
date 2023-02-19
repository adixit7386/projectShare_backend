const Project = require("../models/Project");
const customErrorHandler = require("../services/customErrorHandler");
const AllUsers = async (req, res, next) => {
  const keyword = req.query.search
    ? {
        $or: [
          { title: { $regex: req.query.search, $options: "i" } },
          { description: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  try {
    const project = await Project.find(keyword).find({
      projectAdmin: { $ne: req?.user?._id },
      visibility: { $eq: "public" },
    });
    // const users = await User.find(keyword);

    res.json(project).status(201);
  } catch (err) {
    return next(err);
  }
};
module.exports = AllUsers;
