const { isValidObjectId } = require("mongoose");
const { createError } = require("../helpers");

const isValidId = (req, res, next) => {
  const { bookId } = req.params;

  if (!isValidObjectId(bookId)) {
    next(createError(400, "Not valid id"));
  }
  next();
};

module.exports = isValidId;
