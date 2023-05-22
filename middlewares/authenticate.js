const jwt = require("jsonwebtoken");
const { HttpError } = require("../utils");
const { User } = require("../models/user");

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, accessToken] = authorization.split(" ");
  if (bearer !== "Bearer") {
    next(HttpError(401));
  }
  try {
    const { id } = jwt.verify(accessToken, process.env.ACCESS_SECRET_KEY);
    const user = await User.findById(id);
    if (!user || !user.accessToken) {
      next(HttpError(401));
    }

    req.user = user;
    next();
  } catch (error) {
    next(HttpError(401));
  }
};

module.exports = authenticate;
