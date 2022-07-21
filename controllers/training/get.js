const services = require("../../services/training");

const get = async (req, res) => {
  const { user } = req;
  const result = await services.get(user._id);
  res.json(result);
};

module.exports = get;
