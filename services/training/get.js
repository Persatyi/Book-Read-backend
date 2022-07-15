const { Training } = require("../../models/training");
const createError = require("../../helpers");

const get = async (userId) => {
  const trainings = await Training.find(
    { owner: userId },
    "-__v -owner"
  ).populate("books");
  const currentTraining = trainings?.find(
    (training) => training.end > new Date()
  );
  if (!currentTraining) throw createError(404, "No active training found");
  return currentTraining;
};

module.exports = get;
