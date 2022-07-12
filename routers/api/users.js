const express = require("express");
const router = express.Router();

const { auth, validation } = require("../../middlewares");
const { auth: cntrl } = require("../../controllers");
const { ctrlWrapper } = require("../../helpers");
const { schemas } = require("../../models");

router.post("/signup", validation(schemas.singupSchema), ctrlWrapper(cntrl.signup));

router.post("/login", validation(schemas.loginSchema), ctrlWrapper(cntrl.login));

router.get("/current", auth, ctrlWrapper(cntrl.getCurrent));

router.get("/logout", auth, ctrlWrapper(cntrl.logout));

module.exports = router;