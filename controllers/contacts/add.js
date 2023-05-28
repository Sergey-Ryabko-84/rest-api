const { Contact } = require("../../models/contact");
const { HttpError } = require("../../utils");

const add = async (req, res) => {
  if (!req.file && Object.keys(req.body).length === 0) {
    throw HttpError(400, "missing fields");
  }

  let { avatarURL } = "";
  if (req.file) {
    avatarURL = req.file.path;
  }

  const contact = await Contact.create({
    ...req.body,
    avatarURL,
    owner: req.user._id,
  });
  res.status(201).json(contact);
};

module.exports = add;
