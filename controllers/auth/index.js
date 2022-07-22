const register = require("./register");
const login = require("./login");
const logout = require("./logout");
const getCurrent = require("./getCurrent");
const googleAuth = require("./googleAuth");
const refreshToken = require("./refreshToken");

module.exports = {
  register,
  login,
  logout,
  getCurrent,
  googleAuth,
  refreshToken,
};
