const router = require("express").Router();
const { Emi, User } = require("../models/User");
const {
  ErrorMessage,
  SuccessMessage,
  tokenErrorMessage,
} = require("../utils/handler");
const sequelize = require("../utils/DBConnection");
const bcrypt = require("bcrypt");
const Pay = require("../models/pay");
const { Op } = require("sequelize");

// for adding user to the system

router.get("/end-for", async (req, res) => {
  try {
    var endUsers = [];

    const currentDate = new Date();

    currentDate.setMonth(currentDate.getMonth() + 1);

    const emis = await Emi.findAll({
      include: User,
    });

    console.log(emis.length);

    for (let i = 0; i < emis.length; i++) {
      var item = emis[i];

      var { loanTenure, emiStartDate, id } = item;

      var date = new Date(emiStartDate);

      date.setMonth(parseInt(loanTenure) + date.getMonth());

      console.log(
        date.getFullYear(),
        currentDate.getFullYear(),
        date.getMonth(),
        currentDate.getMonth()
      );

      if (
        date.getMonth() == currentDate.getMonth() &&
        date.getUTCFullYear() == currentDate.getUTCFullYear()
      ) {
        console.log(
          item.getDataValue("User")["name"],
          item.getDataValue("User")["id"]
        );
        endUsers.push({
          id,
          emiStartDate,
          loanTenure,
          name: item.getDataValue("User")["name"],
          userId: item.getDataValue("User")["id"],
        });
      }
    }

    return SuccessMessage(endUsers, res);
  } catch (err) {
    return ErrorMessage(err.message, res);
  }
});

// get all users
router.get("/", async (req, res) => {
  try {
    const date = new Date();

    const month = date.getMonth() + 1,
      year = date.getFullYear();

    const u = await User.findAll({
      attributes: {
        exclude: ["isAdmin", "password"],
      },
      where: {
        isAdmin: false,
      },
      include: {
        model: Emi,

        include: {
          model: Pay,
          where: {
            month,
            year,
          },
        },
      },
    });

    return SuccessMessage(u, res);
  } catch (err) {
    return ErrorMessage(err.message, res);
  }
});

router.post("/create-users", async (req, res) => {
  try {
    const { data } = req.body;

    const t = await sequelize.transaction();

    for (let j = 0; j < data.length; j++) {
      let { name, phoneNumber, email, password, emis } = data[j];

      password = await bcrypt.hash(password, 10);

      // creating users
      const u = await User.create(
        {
          name,
          phoneNumber,
          email,
          password,
        },
        { transaction: t }
      );

      for (let i = 0; i < emis.length; i++) {
        let {
          loanTenure,
          principal,
          monthsAlreadyPaid,
          emiStartDate,
          interestRate,
        } = emis[i];

        loanTenure = parseInt(loanTenure);

        principal = parseInt(principal);

        monthsAlreadyPaid = parseInt(monthsAlreadyPaid);

        // compute EMI
        // p*r*(1+r)^n / [(1+r)^n-1]
        const monthlyInterest = parseFloat(interestRate) / 12 / 100;

        let monthlyAmount =
          (principal *
            monthlyInterest *
            Math.pow(1 + monthlyInterest, loanTenure)) /
          (Math.pow(1 + monthlyInterest, loanTenure) - 1);

        // console.log(
        //   principal,
        //   principal *
        //     monthlyInterest *
        //     Math.pow(1 + monthlyInterest, loanTenure),
        //   monthlyAmount,
        //   typeof monthlyAmount
        // );

        monthlyAmount = parseInt(monthlyAmount);

        const totalAmount = monthlyAmount * loanTenure;

        const remainingAmount = totalAmount - monthlyAmount * monthsAlreadyPaid;

        const emi = await Emi.create(
          {
            UserId: u.id,
            emiStartDate,
            loanTenure,
            interestRate,
            principal,
            totalAmount,
            monthsAlreadyPaid,
            remainingAmount,
            monthlyAmount,
          },
          { transaction: t }
        );

        // from startDate to endDate create Pay DB
        let date = new Date(emiStartDate);

        for (let i = 1; i <= loanTenure; i++) {
          await Pay.create(
            {
              EmiId: emi.id,
              isPaid: i <= monthsAlreadyPaid,
              month: date.getMonth() + 1,
              year: date.getFullYear(),
            },
            { transaction: t }
          );

          date.setMonth(date.getMonth() + 1);
        }
      }
    }

    await t.commit();

    return SuccessMessage({ message: "Manju ma mohan" }, res);
  } catch (err) {
    return ErrorMessage(err.message, res);
  }
});

////////////////////////////////////////////////////////////////////////
// creating new User
router.post("/create-user", async (req, res) => {
  try {
    const { data } = req.body;

    let { name, phoneNumber, email, password } = data;

    password = await bcrypt.hash(password, 10);

    // creating users
    const u = await User.create({
      name,
      phoneNumber,
      email,
      password,
    });

    return SuccessMessage({}, res);
  } catch (err) {
    return ErrorMessage(err.message, res);
  }
});

////////////////////////////////////////////////////////////////////////
// create a emi for user
router.post("/create-emi", async (req, res) => {
  try {
    const { data } = req.body;

    const { id, emi } = data;

    const u = await User.findOne({
      where: {
        id,
      },
    });

    if (!u) return ErrorMessage("User not found", res);

    let {
      loanTenure,
      principal,
      monthsAlreadyPaid,
      emiStartDate,
      interestRate,
    } = emi;

    loanTenure = parseInt(loanTenure);

    principal = parseInt(principal);

    monthsAlreadyPaid = parseInt(monthsAlreadyPaid);

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

    await Emi.create({
      UserId: u.id,
      emiStartDate,
      loanTenure,
      interestRate,
      principal,
      totalAmount,
      monthsAlreadyPaid,
      remainingAmount,
      monthlyAmount,
    });

    let date = new Date(emiStartDate);

    for (let i = 1; i <= loanTenure; i++) {
      await Pay.create(
        {
          EmiId: emi.id,
          isPaid: i <= monthsAlreadyPaid,
          month: date.getMonth() + 1,
          year: date.getFullYear(),
        },
        { transaction: t }
      );

      date.setMonth(date.getMonth() + 1);
    }

    return SuccessMessage({}, res);
  } catch (err) {
    return ErrorMessage(err.message, res);
  }
});

// retreive details of user
router.get("/:id", async (req, res) => {
  try {
    let { id } = req.params;

    id = parseInt(id);

    const u = await User.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["isAdmin", "password"],
      },
      include: {
        model: Emi,
        include: Pay,
      },
    });

    if (!u) return ErrorMessage("User not found", res);

    return SuccessMessage(u, res);
  } catch (err) {
    return ErrorMessage(err.message, res);
  }
});

// update user payment
router.post("/update/:id", async (req, res) => {
  try {
    // pay - create
    // unpay - delete

    const { EmiId } = req.body;

    let { id } = req.params;

    id = parseInt(id);

    const u = await User.findOne({
      where: {
        id,
      },
    });

    if (!u) return ErrorMessage("User not Found", res);

    const emi = await Emi.findOne({
      where: {
        id: EmiId,
      },
    });

    if (!emi) return ErrorMessage("Emi not Found", res);

    const date = new Date();

    const currYear = date.getFullYear(),
      currMonth = date.getMonth() + 1;

    const pay = await Pay.findOne({
      where: {
        EmiId,
        month: currMonth,
        year: currYear,
      },
    });

    if (!pay) {
      return ErrorMessage("Not Valid Update", res);
    }

    await pay.update({
      isPaid: !pay.isPaid,
    });

    return SuccessMessage({}, res);
  } catch (err) {
    return ErrorMessage(err.message, res);
  }
});

// get month wise data !!
router.post("/month-wise", async (req, res) => {
  try {
    const { year, month } = req.body;

    // const Emis = await Emi.findAll({
    //   include: {
    //     model: Pay,
    //     where: {
    //       month,
    //       year,
    //     },
    //   },
    // });

    const u = await User.findAll({
      attributes: {
        exclude: ["isAdmin", "password"],
      },
    });

    let data = [];

    for (let i = 0; i < u.length; i++) {
      const emis = await Emi.findAll({
        where: {
          UserId: u[i].id,
        },

        include: {
          model: Pay,
          where: {
            month: parseInt(month),
            year: parseInt(year),
          },
        },
      });

      for (let k = 0; k < emis.length; k++) {
        let { emiStartDate, loanTenure, id, monthlyAmount } = emis[k];

        const date = new Date(emiStartDate);

        const endDate = new Date(emiStartDate);

        endDate.setMonth(date.getMonth() + loanTenure);

        console.log(id);

        if (endDate.getFullYear() == year && endDate.getMonth() + 1 == month) {
          data.push(["ends", { user: u[i], date: endDate, emiId: id }]);
        }

        if (date.getFullYear() == year && date.getMonth() + 1 == month) {
          data.push(["starts", { user: u[i], date: date, emiId: id }]);
        }

        for (let j = 0; j < emis[k].Pays.length; j++) {
          if (emis[k].Pays[j].isPaid) {
            data.push([
              "paid",
              {
                date: emis[k].Pays[j].updatedAt,
                user: u[i],
                emiId: id,
                monthlyAmount,
              },
            ]);
          }
        }
      }
    }

    return SuccessMessage(data, res);
  } catch (err) {
    return ErrorMessage(err.message, res);
  }
});

module.exports = router;
