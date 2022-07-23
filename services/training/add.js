const { Training } = require("../../models/training");
const { Book } = require("../../models/book");

const add = async (body, { _id }) => {
  const training = await Training.create({ ...body, owner: _id });
  const books = training.books;
  const promises = books.map((bookId) =>
    Book.findByIdAndUpdate(bookId, { status: "reading" })
  );
  await Promise.allSettled(promises);
  return training;
};

module.exports = add;
