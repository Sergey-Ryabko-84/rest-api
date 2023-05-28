const { Contact } = require("../../models/contact");

const getAll = async (req, res) => {
  const { page = 1, limit, name, email, phone, status, favorite } = req.query;

  const queryParams = { owner: req.user._id };
  if (name) queryParams.name = name;
  if (email) queryParams.email = email;
  if (phone) queryParams.phone = phone;
  if (status) queryParams.status = status;
  if (favorite) queryParams.favorite = favorite;

  const paginationParams = { skip: (page - 1) * limit, limit };

  const contactsList = await Contact.find(queryParams, null, paginationParams);

  res.json(contactsList);
};

module.exports = getAll;
