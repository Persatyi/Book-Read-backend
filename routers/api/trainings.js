const express = require("express");
const router = express.Router();

const { ctrlWrapper } = require("../../helpers");
const { validation, auth } = require("../../middlewares");
const ctrl = require("../../controllers/training");

const { schemas } = require("../../models/training");

router.post("/", auth, validation(schemas.add), ctrlWrapper(ctrl.add));
router.get("/", auth, ctrlWrapper(ctrl.get));

module.exports = router;
