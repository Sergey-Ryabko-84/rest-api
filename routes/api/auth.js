const express = require("express");
const ctrl = require("../../controllers/auth")
const { validateBody } = require("../../middlewares");
const { schemas } = require("../../models/user");

const router = express.Router();

// SingUp
router.post("/register", validateBody(schemas.signupSchema), ctrl.register);

// SingIn
router.post("/login", validateBody(schemas.signinSchema), ctrl.login);
router.get("/current", ctrl.getCurrent);
router.get("/google", ctrl.googleAuth);
router.get("/google-redirect", ctrl.googleRedirect);

// SingOut
router.post("/logout", ctrl.logout);

module.exports = router;
