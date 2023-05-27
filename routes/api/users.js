const { Router } = require("express");
const { authenticate, validateBody } = require("../../middlewares");
const { uploadCloud } = require("../../middlewares/uploadCloud");
const { ctrlWrapper } = require("../../utils");
const { schemas } = require("../../models/user");
const { getUserInfo, updateUser } = require("../../controllers/users");

const router = Router();

router.get("/", authenticate, ctrlWrapper(getUserInfo));

router.patch(
  "/",
  authenticate,
  validateBody(schemas.updateSchema),
  uploadCloud.single("avatar"),
  ctrlWrapper(updateUser)
);

module.exports = router;
