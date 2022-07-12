const Training = require("../../models/training");

const add = async (body) => {
  const training = await Training.create({ ...body });
  return training;
};

module.exports = add;
