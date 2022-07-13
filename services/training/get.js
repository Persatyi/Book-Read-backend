const { Training } = require("../../models/training");

const get = async (userId) => {
  const trainings = await Training.find({ owner: userId }, "-__v -owner");
  const currentTraining = trainings?.find(
    (training) => training.end > new Date()
  );
  return currentTraining;
};

module.exports = get;
