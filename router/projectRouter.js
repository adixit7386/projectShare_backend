const express = require("express");
const verifyToken = require("../middleware/verifyToken");
const CreateProjectControllers = require("../controllers/CreateProjectControllers");
const router = express.Router();
router.post("/", verifyToken, CreateProjectControllers);

module.exports = router;
