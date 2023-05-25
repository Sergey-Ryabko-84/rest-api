const { ctrlWrapper } = require("../../utils");

const getUserInfo = require("./getUserInfo");
const updateUser = require("./updateUser");

module.exports = {
  getUserInfo: ctrlWrapper(getUserInfo),
  updateUser: ctrlWrapper(updateUser),
};