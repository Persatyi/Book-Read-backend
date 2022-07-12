// Imports

const express = require("express");
const { books: ctrl } = require("../../controllers")
const { ctrlWrapper } = requiure("../../helpers");
// Need add "auth"
const { validation } = require("../../middlewares")
const { schemas } = require("../../models/book")
const router = express.Router();

// Routing

// Get all contact
router.get("/", ctrlWrapper(ctrl.getAll));

// Add books to library
router.post("/", validation(schemas.addBook), ctrlWrapper(ctrl.add));

module.exports = router;