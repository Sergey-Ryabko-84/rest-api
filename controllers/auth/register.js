const bcrypt = require("bcrypt");

const { User } = require("../../models/user");
const { HttpError } = require("../../utils");

const register = async (req, res) => {
    console.log("register");
  const { email, password } = req.body;
  existingUser = await User.findOne({ email });
  if (existingUser) {
    throw HttpError(409, "Email already in use");
  }

  const hashPass = await bcrypt.hash(password, 10);
  const newUser = await User.create({ ...req.body, password: hashPass });

  res.status(201).json({ user: { name: newUser.name, email: newUser.email } });
};

module.exports = register;
