const getCurrent = async (req, res) => {
  const { _id, name, email, avatarURL, accessToken, refreshToken } = req.user;
  console.log(req.user);
  res.json({
    accessToken,
    refreshToken,
    user: { id: _id, name, email, avatarURL },
  });
};

module.exports = getCurrent;
