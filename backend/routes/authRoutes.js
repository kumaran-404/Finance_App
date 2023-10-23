const User = require("../models/User");
const { ErrorMessage, SuccessMessage } = require("../utils/handler");
const brcypt = require("bcrypt");
const { createToken, getToken } = require("../validators/token");
const router = require("express").Router();

router.post("/login", async (req, res) => {
  try {
    const { phoneNumber, password } = req.body;

    const user = await User.findOne({
      phoneNumber,
    });

    if (!user) return ErrorMessage("User not Found", res);

    const result = await brcypt.compare(
      password,
      user.getDataValue("password")
    );

    if (result) {
      const token = createToken({
        name: user.getDataValue("name"),
        phoneNumber: user.getDataValue("phoneNumber"),
        id: user.getDataValue("id"),
        isAdmin: user.getDataValue("isAdmin"),
      });
      return SuccessMessage({ token }, res);
    }
    return ErrorMessage("Password is wrong", res);
  } catch (err) {
    return ErrorMessage(err.message, res);
  }
});

router.post("/verifyJWT", async (req, res) => {
  try {
    const token = getToken(req);

    if (!token) return ErrorMessage("JWT Not Found", res);

    return SuccessMessage(token, res);
  } catch (err) {
    return ErrorMessage(err.message, res);
  }
});

module.exports = router;
