const { Router } = require("express");
const ctrl = require("../../controllers/contacts");
const { authenticate, validateBody } = require("../../middlewares");
const { schemas } = require("../../models/contact");

const router = Router();

router.post("/", authenticate, validateBody(schemas.addSchena), ctrl.add);

module.exports = router;
