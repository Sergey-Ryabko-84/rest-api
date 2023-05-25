const { User } = require("../../models/user");

const updateUser = async (req, res) => {
  let { avatarURL } = req.user;
  if (req.file) {
    avatarURL = req.file.path;
  }

  const user = await User.findByIdAndUpdate(
    req.user._id,
    { avatarURL, ...req.body },
    { new: true }
  );

  res.json(user);
};

module.exports = updateUser;
