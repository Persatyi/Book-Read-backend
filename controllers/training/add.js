const services = require("../../services/training");

const add = async (req, res) => {
  const { body, user } = req;
  const response = await services.add(body, user);
  res.status(201).json(response);
};

module.exports = add;
