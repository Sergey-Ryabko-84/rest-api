const express = require("express");
const { authenticate } = require("../../middlewares");
const { uploadCloud } = require("../../middlewares/uploadCloud");
const { ctrlWrapper } = require("../../utils");
const { getUserInfo, updateUser } = require("../../controllers/users");

const router = express.Router();

router.get("/", authenticate, ctrlWrapper(getUserInfo));

router.patch(
  "/",
  authenticate,
  uploadCloud.single("avatar"),
  ctrlWrapper(updateUser)
);

module.exports = router;
