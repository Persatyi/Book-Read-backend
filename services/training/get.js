const { Training } = require("../../models/training");

const get = async (userId) => {
  const trainings = await Training.find(
    { owner: userId },
    "-__v -owner"
  ).populate("books");
  const currentTraining = trainings?.find(
    (training) => training.end > new Date()
  );
  if (!currentTraining) return {};
  return currentTraining;
};

module.exports = get;
