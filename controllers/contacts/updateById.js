const { Contact } = require("../../models/contact");
const { HttpError } = require("../../utils");

const updateById = async (req, res) => {
  if (!req.file && Object.keys(req.body).length === 0) {
    throw HttpError(400, "missing fields");
  }
  const { id: _id } = req.params;
  const { _id: owner } = req.user;

  const contact = await Contact.findOne({ _id, owner });
  if (!contact) {
    throw HttpError(404, "Not found");
  }
  let { avatarURL } = contact;
  if (req.file) {
    avatarURL = req.file.path;
  }

  await Contact.findOneAndUpdate(
    { _id, owner },
    { avatarURL, ...req.body },
    { new: true }
  );

  res.json(contact);
};

module.exports = updateById;
