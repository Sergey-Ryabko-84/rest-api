const express = require("express");
const { authenticate } = require("../../middlewares");
const { uploadCloud } = require("../../middlewares/uploadCloud");
const { ctrlWrapper } = require("../../utils");
const updateUser = require("../../controllers/users/updateUser");

const router = express.Router();

router.patch("/", authenticate, uploadCloud.single("avatar"), ctrlWrapper(updateUser));

module.exports = router;
