const { createError } = require("../../helpers");
const { addNewTokens } = require("../../services/users");
const jwt = require("jsonwebtoken");
const { SECRET_REFRESH_KEY } = process.env;
const { User } = require("../../models/user");

const refreshToken = async (req, res) => {
  const { refreshToken } = req.body;
  const { id } = jwt.verify(refreshToken, SECRET_REFRESH_KEY);
  const user = await User.findById(id);
  if (!user || !user.refreshToken) {
    throw createError(401);
  }
  const newTokens = await addNewTokens(user._id);
  res.json({
    token: newTokens.token,
    refreshToken: newTokens.refreshToken,
  });
};

module.exports = refreshToken;

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZDkxM2Y0NTlmMWE0OTAyOWJmYjE4OCIsImlhdCI6MTY1ODM5MzU4OSwiZXhwIjoxNjg5OTUxMTg5fQ.88mJZckDG8-kxvtKloXJbyu82JN3wEGm554KdfeWmlE
