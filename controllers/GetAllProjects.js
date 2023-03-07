const Project = require("../models/Project");
const customErrorHandler = require("../services/customErrorHandler");
const AllUsers = async (req, res, next) => {
  const keyword = req.query.search
    ? {
        $or: [
          { title: { $regex: req.query.search } },
          { description: { $regex: req.query.search } },
        ],
      }
    : {};
  try {
    let project = req.query.search
      ? await Project.find(keyword)
          .find({ visibility: { $eq: "public" } })
          .populate("members", "-password")
      : await Project.find({ visibility: "public" }).populate(
          "members",
          "-password"
        );

    res.json(project).status(201);
  } catch (err) {
    return next(err);
  }
};
module.exports = AllUsers;
