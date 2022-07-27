const { Book } = require("../../models/book");
const { createError } = require("../../helpers");

const deleteBook = async (req, res) => {
  const { bookId } = req.params;
  const result = await Book.findByIdAndRemove(bookId);

  if (!result) {
    throw createError(404);
  }

  res.json({ message: "book deleted" });
};

module.exports = deleteBook;
