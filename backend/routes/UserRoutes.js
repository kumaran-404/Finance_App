const router = require("express").Router();
const Users = require("../models/User");
const Pay = require("../models/pay");
const { ErrorMessage, SuccessMessage } = require("../utils/handler");
const { body } = require("express-validator");
const { validator } = require("../validators/index");
const userValidator = require("../validators/userRoutesValidator");
const User = require("../models/User");
const { Op } = require("sequelize");
const sequelize = require("../utils/DBConnection");
const bcrypt = require("bcrypt");

// get all users
router.get("/", async (req, res) => {
  try {
    const result = await Users.findAll({ order: ["name"] });

    return SuccessMessage(result, res);
  } catch (err) {
    return ErrorMessage(err.message, res);
  }
});

// get for particular month 
router.post(
  "/month",
  userValidator.getByMonthValidator,
  validator,
  async (req, res) => {
    try {
      const { month, year } = req.body;

      let result = await Pay.findAll({
        where: {
          month,
          year,
        },
        order: ["date", "time"],
        include: {
          model: Users,
          attributes: ["id", "name", "phoneNumber"],
        },
      });

      let data = {},
        amount = {};

      result.map((item) => {
        const date =
          item.getDataValue("date") +
          "-" +
          item.getDataValue("month") +
          "-" +
          item.getDataValue("year");

        if (!(date in data)) {
          data[date] = [];
          amount[date] = 0;
        }

        amount[date] += item.getDataValue("amountPaid");

        data[date].push({
          name: item.getDataValue("User").getDataValue("name"),
          phoneNumber: item.getDataValue("User").getDataValue("phoneNumber"),
          time: item.getDataValue("time"),
          UserId: item.getDataValue("UserId"),
        });
      });

      return SuccessMessage({ amount, data }, res);
    } catch (err) {
      return ErrorMessage(err.message, res);
    }
  }
);

//get specific user
// only route authorised to user 
router.get("/user/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const user = await Users.findOne({
      where: {
        id,
      },
      include: {
        model: Pay,
      },
    });

    if (!user) return ErrorMessage("User not Found", res);

    const result = await Pay.findAll({
      where: {
        id,
      },
    });

    return SuccessMessage(result, res);
  } catch (err) {
    return ErrorMessage(err.message, res);
  }
});

//create new user
router.post(
  "/create",
  userValidator.createValidator,
  validator,
  async (req, res) => {
    try {
      const data = req.body;

      let { password } = req.body;

      password = await bcrypt.hash(password, 10);

      await Users.create({ ...data, password });

      return SuccessMessage({}, res);
    } catch (err) {
      return ErrorMessage(err.message, res);
    }
  }
);

// update users monthly pay
// paid : true -> may this month payment
// unpaid : undo paying
router.post(
  "/update",
  userValidator.updateValidator,
  validator,
  async (req, res, next) => {
    try {
      const { id, paid, amountPaid } = req.body;

      const today = new Date();

      const month = today.getMonth(),
        year = today.getFullYear(),
        date = today.getDate(),
        time = today.toLocaleTimeString();

      const user = await Users.findOne({
        where: {
          id,
        },
      });

      if (!user) return ErrorMessage("User Not Found", res);

      const pay = await Pay.findOne({
        where: {
          UserId: id,
          month,
          year,
        },
      });

      if (paid) {
        if (pay) {
          return ErrorMessage("Paid already", res);
        }

        await Pay.create({
          month,
          year,
          date,
          time,
          amountPaid,
          UserId: id,
        });

        return SuccessMessage({}, res);
      }

      if (pay) {
        await Pay.destroy({
          where: {
            UserId: id,
            month,
            year,
          },
        });
        return SuccessMessage({}, res);
      }

      return ErrorMessage("No payment made for this User", res);
    } catch (err) {
      return ErrorMessage(err.message, res);
    }
  }
);

router.get(
  "/search",
  userValidator.searchValidator,
  validator,
  async (req, res, next) => {
    try {
      const { name } = req.body;

      const users = await User.findAll({
        where: {
          name: {
            [Op.substring]: name,
          },
        },
      });

      return SuccessMessage(users, res);
    } catch (err) {
      return ErrorMessage(err.message, res);
    }
  }
);

module.exports = router;
