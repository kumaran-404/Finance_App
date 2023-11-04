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

// get for particular month
router.post(
  "/month",
  userValidator.getByMonthValidator,
  validator,
  async (req, res) => {
    try {
      const { month, year } = req.body;

      const thisMonth = new Date().getMonth(),
        thisYear = new Date().getFullYear();

      let where = {};

      if (month == thisMonth && year == thisYear) {
        where = { remainingAmount: { [Op.gt]: 0 } };
      }

      let temp = await Users.findAll({
        where,
        include: {
          model: Pay,
          where: {
            month,
            year,
          },
          required: false,
        },
      });

      let paid = [],
        unpaid = [],
        dateWise = {},
        tot = 0,
        paidAmount = 0;

      temp.map((item) => {
        tot += parseInt(item.getDataValue("monthlyAmount"));

        const d = new Date(item.getDataValue("emiStartDate"));

        const endDate = new Date(
          d.setMonth(d.getMonth() + item.getDataValue("loanTenure"))
        ).toLocaleDateString();

        if (item.getDataValue("Pays").length === 0) {
          unpaid.push({
            id: item.getDataValue("id"),
            name: item.getDataValue("name"),
            phoneNumber: item.getDataValue("phoneNumber"),
            amount: item.getDataValue("monthlyAmount"),
            endsOn: endDate,
          });
          return;
        }

        paidAmount += parseInt(item.getDataValue("monthlyAmount"));

        const date =
          item.getDataValue("Pays")[0].getDataValue("date") +
          "-" +
          (item.getDataValue("Pays")[0].getDataValue("month") + 1) +
          "-" +
          item.getDataValue("Pays")[0].getDataValue("year");

        if (!(date in dateWise)) {
          dateWise[date] = { users: [], amount: 0 };
        }

        dateWise[date]["amount"] += item
          .getDataValue("Pays")[0]
          .getDataValue("amountPaid");

        dateWise[date]["users"].push({
          id: item.getDataValue("id"),
          name: item.getDataValue("name"),
          phoneNumber: item.getDataValue("phoneNumber"),
          amount: item.getDataValue("monthlyAmount"),
          endsOn: endDate,
        });

        paid.push({
          id: item.getDataValue("id"),
          name: item.getDataValue("name"),
          phoneNumber: item.getDataValue("phoneNumber"),
          amount: item.getDataValue("monthlyAmount"),
          endsOn: endDate,
        });
      });

      dateWise["amount"] = {};

      dateWise["amount"]["total"] = tot;
      dateWise["amount"]["paid"] = paidAmount;

      return SuccessMessage({ paid, dateWise, unpaid }, res);
    } catch (err) {
      console.log(err);
      return ErrorMessage(err.message, res);
    }
  }
);

//get specific user
// only route authorised to user
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;

    // console.log(id);

    const user = await Users.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["isAdmin", "password"],
      },
      include: {
        model: Pay,
      },
    });

    if (!user) return ErrorMessage("User not Found", res);

    return SuccessMessage(user, res);
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

      let { password, loanTenure, interestRate, monthsAlreadyPaid, principal } =
        req.body;

      // compute EMI
      // p*r*(1+r)^n / [(1+r)^n-1]
      const monthlyInterest = parseFloat(interestRate) / 12 / 100;

      let monthlyAmount =
        (principal *
          monthlyInterest *
          Math.pow(1 + monthlyInterest, loanTenure)) /
        (Math.pow(1 + monthlyInterest, loanTenure) - 1);

      monthlyAmount = parseInt(monthlyAmount);

      const totalAmount = monthlyAmount * loanTenure;

      const remainingAmount = totalAmount - monthlyAmount * monthsAlreadyPaid;

      password = await bcrypt.hash(password, 10);

      await Users.create({
        ...data,
        totalAmount,
        monthlyAmount,
        remainingAmount,
      });

      return SuccessMessage({}, res);
    } catch (err) {
      console.log(err);
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
      const { id, paid } = req.body;

      const today = new Date();

      const month = today.getMonth(),
        year = today.getFullYear(),
        date = today.getDate(),
        time = today.toLocaleTimeString();

      const t = await sequelize.transaction();

      for (let i = 0; i < id.length; i++) {
        const user = await Users.findOne({
          where: {
            id: id[i],
          },
        });

        if (!user) {
          t.rollback();
          return ErrorMessage("Some Users Not Found", res);
        }

        const pay = await Pay.findOne({
          where: {
            UserId: id[i],
            month,
            year,
          },
        });

        if (paid) {
          console.log(user.getDataValue("name"));
          if (pay) {
            t.rollback();
            console.log(pay);
            return ErrorMessage(
              "Some Users Paid already" + user.getDataValue("name"),
              res
            );
          }

          await Pay.create(
            {
              month,
              year,
              date,
              time,
              amountPaid: user.getDataValue("monthlyAmount"),
              UserId: id[i],
            },
            { transaction: t }
          );

          await user.update(
            {
              monthsAlreadyPaid: user.getDataValue("monthsAlreadyPaid") + 1,
              remainingAmount:
                user.getDataValue("totalAmount") -
                (user.getDataValue("monthsAlreadyPaid") + 1) *
                  user.getDataValue("monthlyAmount"),
            },
            { transaction: t }
          );
        } else {
          if (pay) {
            await Pay.destroy(
              {
                where: {
                  UserId: id[i],
                  month,
                  year,
                },
              },
              { transaction: t }
            );
            await user.update(
              {
                monthsAlreadyPaid: user.getDataValue("monthsAlreadyPaid") - 1,
                remainingAmount:
                  user.getDataValue("totalAmount") -
                  (user.getDataValue("monthsAlreadyPaid") - 1) *
                    user.getDataValue("monthlyAmount"),
              },
              { transaction: t }
            );
          }
        }
      }
      await t.commit();
      return SuccessMessage({}, res);
    } catch (err) {
      console.log(err);
      return ErrorMessage(err.message, res);
    }
  }
);

router.post(
  "/search",
  userValidator.searchValidator,
  validator,
  async (req, res, next) => {
    try {
      const { searchParam, mode } = req.body;

      console.log(searchParam, mode);

      if (mode == 0) {
        const users = await User.findAll({
          where: {
            [Op.or]: [
              {
                name: {
                  [Op.substring]: searchParam,
                },
              },
              {
                phoneNumber: {
                  [Op.substring]: searchParam,
                },
              },
            ],
          },
          attributes: {
            exclude: ["isAdmin", "password"],
          },
        });

        return SuccessMessage(users, res);
      }

      //mode1 : paid

      const month = new Date().getMonth(),
        year = new Date().getFullYear();

      const Pays = await Users.findAll({
        where: {
          [Op.or]: [
            {
              name: {
                [Op.substring]: searchParam,
              },
            },
            {
              phoneNumber: {
                [Op.substring]: searchParam,
              },
            },
          ],
        },
        include: {
          model: Pay,
          required: false,
          attributes: {
            exclude: ["isAdmin", "password"],
          },
          where: {
            month,
            year,
          },
        },
        attributes: {
          exclude: ["password", "isAdmin"],
        },
      });

      let temp = [];

      Pays.map((item) => {
        if (mode === 1 && item.getDataValue("Pays").length === 1) {
          item["amount"] = item["monthlyAmount"];

          temp.push(item);
        } else if (mode === 2 && item.getDataValue("Pays").length === 0) {
          item["amount"] = item["monthlyAmount"];
          temp.push(item);
        }
      });

      return SuccessMessage(temp, res);
    } catch (err) {
      console.log(err);
      return ErrorMessage(err.message, res);
    }
  }
);

router.post("/create-users", async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const data = req.body;

    for (let i = 0; i < data.length; i++) {
      let { password, loanTenure, interestRate, monthsAlreadyPaid, principal } =
        data[i];

      password = toString(password);

      // compute EMI
      // p*r*(1+r)^n / [(1+r)^n-1]
      const monthlyInterest = parseFloat(interestRate) / 12 / 100;

      let monthlyAmount =
        (principal *
          monthlyInterest *
          Math.pow(1 + monthlyInterest, loanTenure)) /
        (Math.pow(1 + monthlyInterest, loanTenure) - 1);

      monthlyAmount = parseInt(monthlyAmount);

      const totalAmount = monthlyAmount * loanTenure;

      const remainingAmount = totalAmount - monthlyAmount * monthsAlreadyPaid;

      password = await bcrypt.hash(password, 10);

      await Users.create(
        {
          ...data[i],
          totalAmount,
          monthlyAmount,
          remainingAmount,
        },
        { transaction: t }
      );
    }

    await t.commit();

    return SuccessMessage([], res);
  } catch (err) {
    console.log(err);
    await t.rollback();
    return ErrorMessage(err.message, res);
  }
});

module.exports = router;
