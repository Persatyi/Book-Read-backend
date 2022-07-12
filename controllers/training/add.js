const services = require("../../services/training");

const add = async (req, res) => {
  const { body } = req;
  const response = await services.add(body);
  res.status(201).json(response);
};

module.exports = add;
