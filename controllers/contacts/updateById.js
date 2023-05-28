const { Contact } = require("../../models/contact");
const { HttpError } = require("../../utils");

const updateById = async (req, res) => {
  const contact = await Contact.findOneAndUpdate(
    {
      _id: req.params.id,
      owner: req.user._id,
    },
    req.body,
    { new: true }
  );
  if (!contact) {
    throw HttpError(404, "Not found");
  }

  res.json(contact);
};

module.exports = updateById;
