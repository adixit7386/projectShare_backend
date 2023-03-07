const Chat = require("../models/Chat");
const User = require("../models/User");
const Project = require("../models/Project");

const FetchUserProjects = async (req, res, next) => {
  const userId = req.user._id;

  try {
    var Projects = await Project.find({
      members: { $elemMatch: { $eq: req.user._id } },
    }).populate("members", "-password");

    return res.json(Projects).status(201);
  } catch (error) {
    console.log(error);
    return next(error);
  }
  res.json(userId).status(201);
};

module.exports = FetchUserProjects;
