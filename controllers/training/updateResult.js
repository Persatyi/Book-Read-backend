const { Result } = require("../../models/result");
const { get: getTraining } = require("../../services/training");
const { Training } = require("../../models/training");
const createError = require("../../helpers");

const updateResult = async (req, res) => {
  const { body, user } = req;
  const data = await Result.create(body);
  const training = await getTraining(user._id);
  //   training.results = [...training.results, data._id];
  //   await training.save();
  await Training.findByIdAndUpdate(training._id, {
    results: [...training.results, data._id],
  });
  const collection = await Result.find({}, "-__v");

  if (!collection) {
    throw createError(404, "No results in collection");
  }
  // const totalPages = collection.reduce((total, el) => {
  //   return (total += Number(el.pages));
  // }, 0);

  res.status(201).json(collection);
};

module.exports = updateResult;
