const { Router } = require("express");
const ctrl = require("../../controllers/contacts");
const { authenticate, validateBody, isValidId } = require("../../middlewares");
const { schemas } = require("../../models/contact");

const router = Router();

router.get("/:id", authenticate, isValidId, ctrl.getById);

router.post("/", authenticate, validateBody(schemas.addSchena), ctrl.add);

module.exports = router;
