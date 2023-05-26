const express = require("express");
const ctrl = require("../../controllers/auth")
const { validateBody, authenticate } = require("../../middlewares");
const { schemas } = require("../../models/user");

const router = express.Router();

// SingUp
router.post("/register", validateBody(schemas.signupSchema), ctrl.register);

// SingIn
router.post("/login", validateBody(schemas.signinSchema), ctrl.login);
router.post("/refresh", validateBody(schemas.refreshSchema), ctrl.refresh);
router.get("/current", authenticate, ctrl.getCurrent);
router.get("/google", ctrl.googleAuth);
router.get("/google-redirect", ctrl.googleRedirect);
router.get("/password", authenticate, ctrl.createNawPassword);

// SingOut
router.post("/logout", authenticate, ctrl.logout);

module.exports = router;
