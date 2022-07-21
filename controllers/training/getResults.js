const { Result } = require("../../models/result");
const { get: getTraining } = require("../../services/training");
const createError = require("../../helpers");

const getResults = async (req, res) => {
  const { user } = req;
  const training = await getTraining(user._id);
  if (!training) {
    throw createError(404, "Training not found");
  }
  const collection = await Result.find({}, "-__v");
  if (!collection) {
    throw createError(404, "Collection not found");
  }
  if (collection.length === 0) {
    return res.status(200).json({
      message: "there is no data in this collection yet",
      data: [],
      total: 0,
      added: 0,
    });
  }

  const totalPages = training.books.reduce((total, el) => {
    return (total += Number(el.pages));
  }, 0);

  const addedPages = collection.reduce((total, el) => {
    return (total += Number(el.pages));
  }, 0);

  const response = {
    data: collection,
    total: totalPages,
    added: addedPages,
  };

  res.status(200).json(response);
};

module.exports = getResults;
