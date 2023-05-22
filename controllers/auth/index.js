const { ctrlWrapper } = require("../../utils");

const register = require("./register");
const login = require("./login");
const refresh = require("./refresh");
const getCurrent = require("./getCurrent");
const googleAuth = require("./googleAuth");
const googleRedirect = require("./googleRedirect");
const logout = require("./logout");

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  refresh: ctrlWrapper(refresh),
  getCurrent: ctrlWrapper(getCurrent),
  googleAuth: ctrlWrapper(googleAuth),
  googleRedirect: ctrlWrapper(googleRedirect),
  logout: ctrlWrapper(logout),
};
