const customErrorHandler = require("../services/customErrorHandler");

const Project = require("../models/Project");
const DeleteSingleProjectControllers = async (req, res, next) => {
  try {
    let singleProject = await Project.findById(req.params.id);

    if (singleProject.projectAdmin.toString() !== req.user._id) {
      return next(
        customErrorHandler.unAuthorized(
          "you are not authorized to complete this action"
        )
      );
    }
    try {
      let project = await Project.findByIdAndDelete(req.params.id);
      res.json(true).status(200);
    } catch (err) {
      return next(err);
    }
  } catch (err) {
    return next(err);
  }
};
module.exports = DeleteSingleProjectControllers;
