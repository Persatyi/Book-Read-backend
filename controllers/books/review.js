const { Book } = require("../../models/book");
const {createError} = require("../../helpers");

const review = async (req, res) => {
  const { bookId } = req.params;
  const { rating, resume } = req.body;
  const result = await Book.findByIdAndUpdate(bookId, { rating, resume }, { new: true });
  if (!result) {
    throw createError(404, "Book not found");
  }
  res.status(201).json(result);
}

module.exports = review;