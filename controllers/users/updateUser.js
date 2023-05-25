const { User } = require("../../models/user");
const { HttpError } = require("../../utils");

const updateUser = async (req, res) => {
  if (!req.file && Object.keys(req.body).length === 0) {
    throw HttpError(400, "missing fields");
    }
    
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
