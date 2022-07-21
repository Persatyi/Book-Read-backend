const { get: getTraining } = require("../../services/training");
const { Training } = require("../../models/training");
const services = require("../../services/results");
const { Result } = require("../../models/result");

const updateResult = async (req, res) => {
  const { body, user } = req;
  const data = await services.add(body);
  const training = await getTraining(user._id);
  const updatedTraining = await Training.findByIdAndUpdate(
    training._id,
    {
      results: [...training.results, data._id],
    },
    { new: true }
  ).populate("results");

  const totalPages = training.books.reduce((total, el) => {
    return (total += Number(el.pages));
  }, 0);

  const addedPages = updatedTraining.results.reduce((total, el) => {
    return (total += Number(el.pages));
  }, 0);

  if (addedPages >= totalPages || training.end < new Date()) {
    await Result.deleteMany({ _id: { $in: updatedTraining.results } });
    res.status(200).send({
      message: "Data was removed",
      data: [],
      total: 0,
      added: 0,
      start: null,
      end: null,
    });
  } else {
    res.status(201).json({
      data: updatedTraining.results,
      total: totalPages,
      added: addedPages,
      start: training.start,
      end: training.end,
    });
  }
};

module.exports = updateResult;
