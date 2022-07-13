const { Result } = require("../../models/result");
const { get: getTraining } = require("../../services/training");
const { Training } = require("../../models/training");

const updateResult = async (req, res) => {
  const { body, user } = req;
  const data = await Result.create(body);
  const training = await getTraining(user._id);
  //   training.results = [...training.results, data._id];
  //   await training.save();
  await Training.findByIdAndUpdate(training._id, {
    results: [...training.results, data._id],
  });
  const response = {
    id: data._id,
    pages: data.pages,
    date: data.date,
  };
  res.status(201).json(response);
};

module.exports = updateResult;
