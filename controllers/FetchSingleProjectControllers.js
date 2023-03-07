const customErrorHandler = require("../services/customErrorHandler");

const Project = require("../models/Project");
const FetchSingleProjectControllers = async (req, res, next) => {
  try {
    let project = await Project.findById(req.params.id).populate(
      "members",
      "-password"
    );
    res.json(project).status(200);
  } catch (err) {
    return next(err);
  }
};
module.exports = FetchSingleProjectControllers;
