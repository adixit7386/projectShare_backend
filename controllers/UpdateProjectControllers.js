const customErrorHandler = require("../services/customErrorHandler");

const Project = require("../models/Project");
const UpdateProjectControllers = async (req, res, next) => {
  if (req.user._id !== req.body.projectAdmin) {
    return next(
      customErrorHandler.unAuthorized(
        "you are not authorized to complete this action"
      )
    );
  }

  try {
    let project = await Project.findOneAndUpdate(
      { _id: req.body._id },
      req.body,
      {
        new: false,
      }
    );

    res.json(project).status(200);
  } catch (err) {
    return next(err);
  }
};
module.exports = UpdateProjectControllers;
