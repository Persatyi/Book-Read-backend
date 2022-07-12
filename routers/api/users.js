const express = require("express");

const router = express.Router();

const { auth: ctrl } = require("../../controllers");

const { ctrlWrapper } = require("../../helpers");

const { validation } = require("../../middlewares");

const { schemas } = require("../../models/user");

router.post(
  "/register",
  validation(schemas.registerUser),
  ctrlWrapper(ctrl.register)
);

router.post("/login", validation(schemas.loginUser), ctrlWrapper(ctrl.login));

module.exports = router;
