const { Contact } = require("../../models/contact");
const { HttpError } = require("../../utils");

const deleteById = async (req, res) => {
    const contact = await Contact.findOneAndRemove({
      _id: req.params.id,
      owner: req.user._id,
    });
    if (!contact) throw HttpError(404, "Not found");
    res.json({ contact });
};

module.exports = deleteById;
