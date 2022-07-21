const { User } = require("../../models/user");
const jwt = require("jsonwebtoken");

const { SECRET_KEY, SECRET_REFRESH_KEY } = process.env;

const addNewTokens = async (userId) => {
  const payload = {
    id: userId,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
  const refreshToken = jwt.sign(payload, SECRET_REFRESH_KEY, {
    expiresIn: "1y",
  });
  await User.findByIdAndUpdate(userId, { token, refreshToken });
  return { token, refreshToken };
};

module.exports = addNewTokens;
