const services = require("../../services/books");

const edit = async (req, res) => {
  const { _id: userId } = req.user;
  const { bookId } = req.params;
  const newBook = await services.edit({ userId, bookId, body: req.body });
  res.status(201).json(newBook);
};

module.exports = edit;
