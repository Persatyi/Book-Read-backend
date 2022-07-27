// Imports

const express = require("express");
const { books: ctrl } = require("../../controllers");
const { ctrlWrapper } = require("../../helpers");
const { validation, auth, isValidId } = require("../../middlewares");
const { schemas } = require("../../models/book");
const router = express.Router();

// Routing

// Get all books
router.get("/", auth, ctrlWrapper(ctrl.getAll));

// Add books to library
router.post("/", auth, validation(schemas.addBook), ctrlWrapper(ctrl.add));

// Add book review
router.patch(
  "/:bookId",
  auth,
  validation(schemas.reviewBook),
  ctrlWrapper(ctrl.review)
);

// Edit book
router.put(
  "/:bookId",
  auth,
  validation(schemas.addBook),
  ctrlWrapper(ctrl.edit)
);

// Delete book
router.delete("/:bookId", auth, isValidId, ctrlWrapper(ctrl.deleteBook));

module.exports = router;
