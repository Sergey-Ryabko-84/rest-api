const bcrypt = require("bcrypt");
const generator = require("generate-password");
const { User } = require("../../models/user");
const { sendEmail, HttpError } = require("../../utils");
const { accessDataMail } = require("../../utils/mails");

const createNawPassword = async (req, res) => {
  const password = generator.generate({
    length: 10,
    numbers: true,
    symbols: true,
  });
  const hashPass = await bcrypt.hash(password, 10);

  const { email } = req.body;
  const user = await User.findOneAndUpdate({ email }, { password: hashPass });
  if (!user) {
    throw HttpError(401, "Email invalid");
  }

// send password to email
  const newPassEmail = {
    to: user.email,
    subject: "Coontact Book. Password recovery",
    html: accessDataMail(password),
  };

  await sendEmail(newPassEmail);

  res.json({ message: "new password sent to email" });
};

module.exports = createNawPassword;
