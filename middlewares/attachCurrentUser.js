const { User } = require("../models");

module.exports = async (req, res, next) => {
  try {
    // See line 14 in the isAuthenticated.js file
    const loggedInUser = req.user;

    const user = await User.findOne({ where: {id: loggedInUser.id} });

    if (!user) {
      // 400 Bad Request
      return res.status(400).json({ msg: "User does not exist." });
    }

    req.currentUser = user;
    return next();
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: JSON.stringify(err) });
  }
};
