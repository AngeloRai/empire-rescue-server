const jwt = require("jsonwebtoken");

module.exports = function generateToken(user) {
  // Password should never be sent with token.
  const { email, role, id } = user;

  // Accessing Environment Variable in .env
  const signature = process.env.TOKEN_SIGN_SECRET;
  const expiration = "6h";

  return jwt.sign({ email, role, id }, signature, {
    expiresIn: expiration,
  });
};
