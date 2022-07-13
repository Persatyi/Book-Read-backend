const express = require("express");
const router = express.Router();

const { books: ctrl } = require("../../controllers");
const { ctrlWrapper } = require("../../helpers");
const { validation, auth } = require("../../middlewares");
const { schemas } = require("../../models/book");

router.post("/", auth, validation(schemas));

module.exports = router;
