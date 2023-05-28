const { Router } = require("express");
const ctrl = require("../../controllers/contacts");
const { authenticate, validateBody, isValidId } = require("../../middlewares");
const { uploadCloud } = require("../../middlewares/uploadCloud");
const { schemas } = require("../../models/contact");

const router = Router();

router.get("/", authenticate, ctrl.getAll);

router.get("/:id", authenticate, isValidId, ctrl.getById);

router.post(
  "/",
  authenticate,
  validateBody(schemas.addSchena),
  uploadCloud.single("avatar"),
  ctrl.add
);

router.patch(
  "/:id",
  authenticate,
  isValidId,
  validateBody(schemas.updateSchena),
  uploadCloud.single("avatar"),
  ctrl.updateById
);

router.delete("/:id", authenticate, isValidId, ctrl.deleteById);

module.exports = router;
