const express = require("express");
const router = express.Router();
const { ctrlWrapper } = require("../../helpers");
const ctrl = require("../../controllers/training");

router.post("/", ctrlWrapper(ctrl.add));

module.exports = router;
