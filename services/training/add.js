const { Training } = require("../../models/training");

const add = async (body, { _id }) => {
  const training = await Training.create({ ...body, owner: _id });
  return training;
};

module.exports = add;
