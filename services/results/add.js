const { Result } = require("../../models/result");

const add = async (body) => {
  const response = await Result.create(body);
  return response;
};

module.exports = add;
