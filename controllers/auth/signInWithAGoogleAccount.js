const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const generator = require("generate-password");
const { User } = require("../../models/user");

const signInWithAGoogleAccount = async (data) => {
  const user = await User.findOne({ email: data.email });
  if (user) {
    const payload = { id: user._id };
    const accessToken = jwt.sign(payload, process.env.ACCESS_SECRET_KEY, {
      expiresIn: "15m",
    });
    const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET_KEY, {
      expiresIn: "7d",
    });

    await User.findByIdAndUpdate(user._id, { accessToken, refreshToken });

    return { accessToken, refreshToken };
  }

  // signup new user
  const password = generator.generate({
    length: 10,
    numbers: true,
    symbols: true,
  });
  const hashPass = await bcrypt.hash(password, 10);

  await User.create({
    name: data.name,
    password: hashPass,
    email: data.email,
  });

  const newUser = await User.findOne({ email: data.email });
  const payload = { id: newUser._id };
  const accessToken = jwt.sign(payload, process.env.ACCESS_SECRET_KEY, {
    expiresIn: "15m",
  });
  const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET_KEY, {
    expiresIn: "7d",
  });

  await User.findByIdAndUpdate(newUser._id, { accessToken, refreshToken });

  return { accessToken, refreshToken };
};

module.exports = signInWithAGoogleAccount;
