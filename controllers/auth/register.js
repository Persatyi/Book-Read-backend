const bcrypt = require("bcryptjs");
const { User } = require("../../models/user");
const { addNewTokens } = require("../../services/users");

const { createError } = require("../../helpers");

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw createError(409, "Email in use");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const result = await User.create({
    ...req.body,
    password: hashPassword,
  });
  const { token, refreshToken } = await addNewTokens(result._id);
  res.status(201).json({
    token,
    refreshToken,
    user: {
      email: result.email,
      name: result.name,
    },
  });
};

module.exports = register;
