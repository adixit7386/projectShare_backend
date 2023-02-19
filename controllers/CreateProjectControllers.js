const customErrorHandler = require("../services/customErrorHandler");

const Project = require("../models/Project");
const CreateProjectControllers = async (req, res, next) => {
  if (req.user._id !== req.body.projectAdmin) {
    return next(
      customErrorHandler.unAuthorized(
        "you are not authorized to complete this action"
      )
    );
  }
  try {
    const project = await Project.create(req.body);
    const savedProject = await project.save();
    res.json(savedProject).status(200);
  } catch (err) {
    return next(err);
  }
};
module.exports = CreateProjectControllers;
