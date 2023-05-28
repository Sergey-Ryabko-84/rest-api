const { Router } = require("express");
const ctrl = require("../../controllers/users");
const { authenticate, validateBody } = require("../../middlewares");
const { uploadCloud } = require("../../middlewares/uploadCloud");
const { schemas } = require("../../models/user");

const router = Router();

router.get("/", authenticate, ctrl.getUserInfo);

router.patch(
  "/",
  authenticate,
  validateBody(schemas.updateSchema),
  uploadCloud.single("avatar"),
  ctrl.updateUser
);

module.exports = router;
