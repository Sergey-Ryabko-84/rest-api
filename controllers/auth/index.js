const { ctrlWrapper } = require("../../utils");

const register = require("./register");
const login = require("./login");
const getCurrent = require("./getCurrent");
const googleAuth = require("./googleAuth");
const googleRedirect = require("./googleRedirect");
const logout = require("./logout");

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
  googleAuth: ctrlWrapper(googleAuth),
  googleRedirect: ctrlWrapper(googleRedirect),
  logout: ctrlWrapper(logout),
};
