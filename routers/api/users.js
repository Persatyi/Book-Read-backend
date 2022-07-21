const express = require("express");
const router = express.Router();

const { auth, validation } = require("../../middlewares");
const { auth: ctrl } = require("../../controllers");
const { ctrlWrapper } = require("../../helpers");
const { schemas } = require("../../models/user");

router.post("/register", validation(schemas.registerUser), ctrlWrapper(ctrl.register));

router.post("/login", validation(schemas.loginUser), ctrlWrapper(ctrl.login));

router.post("/login-google", validation(schemas.googleLogin), ctrlWrapper(ctrl.googleAuth));

router.get("/current", auth, ctrlWrapper(ctrl.getCurrent));

router.post("/logout", auth, ctrlWrapper(ctrl.logout));

module.exports = router;