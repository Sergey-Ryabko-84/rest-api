const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const { User } = require("../../models/user");
const { HttpError } = require("../../utils");

const register = async (req, res) => {
  const { email, password } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw HttpError(409, "Email already in use");
  }

  const hashPass = await bcrypt.hash(password, 10);
  await User.create({ ...req.body, password: hashPass });

  const newUser = await User.findOne({ email });
  const payload = { id: newUser._id };
  const accessToken = jwt.sign(payload, process.env.ACCESS_SECRET_KEY, {
    expiresIn: "15m",
  });
  const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET_KEY, {
    expiresIn: "7d",
  });

  await User.findByIdAndUpdate(newUser._id, { accessToken, refreshToken });

  res.status(201).json({
    accessToken,
    refreshToken,
    user: {
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      avatarURL: newUser.avatarURL,
    },
  });
};

module.exports = register;
