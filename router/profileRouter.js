const express = require("express");
const verifyToken = require("../middleware/verifyToken");
const CreateProfileControllers = require("../controllers/CreateProfileControllers");
const router = express.Router();
router.post("/", verifyToken, CreateProfileControllers);
module.exports = router;
