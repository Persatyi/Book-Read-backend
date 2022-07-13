// Imports

const express = require("express");
const { books: ctrl } = require("../../controllers");
const { ctrlWrapper } = require("../../helpers");
const { validation, auth } = require("../../middlewares");
const { schemas } = require("../../models/book");
const router = express.Router();

// Routing

// Get all contact
router.get("/",auth, ctrlWrapper(ctrl.getAll));

// Add books to library
router.post("/",auth, validation(schemas.addBook), ctrlWrapper(ctrl.add));

module.exports = router;
