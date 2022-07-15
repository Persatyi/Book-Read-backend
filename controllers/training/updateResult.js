const { Result } = require("../../models/result");
const { get: getTraining } = require("../../services/training");
const { Training } = require("../../models/training");
const createError = require("../../helpers");

const updateResult = async (req, res) => {
  const { body, user } = req;
  const data = await Result.create(body);
  const training = await getTraining(user._id);
  await Training.findByIdAndUpdate(training._id, {
    results: [...training.results, data._id],
  });
  const collection = await Result.find({}, "-__v");
  if (!collection) {
    throw createError(404, "No results in collection");
  }
  const totalPages = training.books.reduce((total, el) => {
    return (total += Number(el.pages));
  }, 0);

  const addedPages = collection.reduce((total, el) => {
    return (total += Number(el.pages));
  }, 0);

  if (addedPages >= totalPages) {
    await Result.deleteMany({});
    res.status(200).send({
      message: "Data was removed",
      data: [],
      total: 0,
      added: 0,
    });
  } else {
    res.status(201).json({
      data: collection,
      total: totalPages,
      added: addedPages,
    });
  }
};

module.exports = updateResult;
