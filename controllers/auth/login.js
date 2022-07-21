const bcrypt = require("bcryptjs");
const { addNewTokens } = require("../../services/users");

const { User } = require("../../models/user");

const { createError } = require("../../helpers");

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw createError(401, "Email or password is wrong");
  }
  const comparePassword = await bcrypt.compare(password, user.password);
  if (!comparePassword) {
    throw createError(401, "Email or password is wrong");
  }
  const { token, refreshToken } = await addNewTokens(user._id);
  res.json({
    token,
    refreshToken,
    user: {
      email: user.email,
      name: user.name,
    },
  });
};

module.exports = login;
