const jwt = require("jsonwebtoken");

const privateKey = process.env.JWT_PRIVATE_KEY;

const getToken = (req) => {
  // token is placed in authorisation header
  let token = req.header("Authorization");

  if (!token) return null;

  if (!token.startsWith("Bearer ")) return null;

  token = token.split(" ");

  if (!token[1]) return null;

  const result = jwt.verify(token[1], privateKey);

  return result;
};

const createToken = (data) => {
  const token = jwt.sign(data, privateKey, { expiresIn: 60 * 60 * 24 });

  return token;
};

module.exports = {
  createToken,
  getToken,
};
