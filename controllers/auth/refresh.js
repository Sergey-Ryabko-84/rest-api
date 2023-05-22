const jwt = require("jsonwebtoken");
const { HttpError } = require("../../utils");
const { User } = require("../../models/user");

const refresh = async (req, res) => {
  const { refreshToken: token } = req.body;
  try {
    const { id } = jwt.verify(token, process.env.REFRESH_SECRET_KEY);
      const user = await User.findOne({ refreshToken: token });
    if (!user) {
      throw HttpError(403, "Token invalid");
    }

    const payload = { id };
    const accessToken = jwt.sign(payload, process.env.ACCESS_SECRET_KEY, {
      expiresIn: "15m",
    });
    const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET_KEY, {
      expiresIn: "7d",
    });

    await User.findByIdAndUpdate(user._id, { accessToken, refreshToken });

    res.json({ accessToken, refreshToken });
  } catch (error) {
    throw HttpError(403, error);
  }
};

module.exports = refresh;
