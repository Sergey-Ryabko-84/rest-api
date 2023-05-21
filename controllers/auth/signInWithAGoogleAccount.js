const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const generator = require("generate-password");
const { User } = require("../../models/user");
const { sendEmail } = require("../../utils");
const { accessDataMail } = require("../../utils/mails");

const signInWithAGoogleAccount = async (data) => {
  const user = await User.findOne({ email: data.email });
  if (user) {
    const payload = { id: user._id };
    const token = jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: "7d",
    });
    user.token.push(token);
    await User.findByIdAndUpdate(user._id, { token: user.token });

    return token;
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

  // send password to email
  const accessDataEmail = {
    to: data.email,
    subject: "Coontact Book",
    html: accessDataMail(password),
  };

  await sendEmail(accessDataEmail);

  const newUser = await User.findOne({ email: data.email });
  const payload = { id: newUser._id };
  const token = jwt.sign(payload, process.env.SECRET_KEY, {
    expiresIn: "7d",
  });
  newUser.token.push(token);

  await User.findByIdAndUpdate(newUser._id, { token: newUser.token });

  return token;
};

module.exports = signInWithAGoogleAccount;
