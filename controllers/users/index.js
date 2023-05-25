const { ctrlWrapper } = require("../../utils");

const updateUser = require("./updateUser");

module.exports = {
  updateUser: ctrlWrapper(updateUser),
};