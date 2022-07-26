const { Book } = require("../../models/book");
const { createError } = require("../../helpers");

const edit = async ({ userId, bookId, body }) => {
  try {
    const newBook = await Book.findOneAndUpdate(
      { owner: userId, _id: bookId },
      { ...body },
      {
        new: true,
        fields: {
          createdAt: 0,
          updatedAt: 0,
          owner: 0,
        },
      }
    );
    if (!newBook) throw createError(400, `Can't found book with ${bookId} id`);
    return newBook;
  } catch (error) {
    throw createError(400, error.message);
  }
};

module.exports = edit;
