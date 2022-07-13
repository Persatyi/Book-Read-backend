const express = require("express");
const router = express.Router();

const ctrl = require("../../controllers/training");
const { ctrlWrapper } = require("../../helpers");
const { validation, auth } = require("../../middlewares");

const { schemas } = require("../../models/result");

router.patch(
  "/",
  auth,
  validation(schemas.add),
  ctrlWrapper(ctrl.updateResult)
);

module.exports = router;
