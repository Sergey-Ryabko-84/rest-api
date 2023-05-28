const { Router } = require("express");
const ctrl = require("../../controllers/contacts");
const { authenticate, validateBody, isValidId } = require("../../middlewares");
const { schemas } = require("../../models/contact");

const router = Router();

router.get("/", authenticate, ctrl.getAll);

router.get("/:id", authenticate, isValidId, ctrl.getById);

router.post("/", authenticate, validateBody(schemas.addSchena), ctrl.add);

router.put(
  "/:id",
  authenticate,
  isValidId,
  validateBody(schemas.updateSchena),
  ctrl.updateById
);

router.delete("/:id", authenticate, isValidId, ctrl.deleteById);

module.exports = router;
