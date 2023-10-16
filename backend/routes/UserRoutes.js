const router = require("express").Router();
const Users = require("../models/User");
const { ErrorMessage, SuccessMessage } = require("../utils/handler");
const { body } = require("express-validator");
const { validator } = require("../validators/index");
const userValidator = require("../validators/userRoutesValidator");

// get all users
router.get("/", async (req, res) => {
  try {
    const result = await Users.find({}).sort({ name: 1 });

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

      await Users.create(data);

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
      const { _id, paid } = req.body;

      const date = new Date(),
        month = date.getMonth(),
        year = date.getFullYear();

      console.log(month, year);

      const user = await Users.findOne({
        _id,
        monthlyPay: { $elemMatch: { month, year } },
      });

      if (paid) {
        if (user) return ErrorMessage("Payment for this already done", res);

        await Users.updateOne(
          { _id },
          {
            $push: {
              monthlyPay: {
                month,
                year,
                date,
              },
            },
          }
        );
      }

      if (user) {
        await Users.updateOne(
          { _id },
          {
            $pull: {
              monthlyPay: {
                month,
                year,
              },
            },
          }
        );

        return SuccessMessage("Payment updated", res);
      }

      return ErrorMessage("Payment is not done yet", res);
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
      const name = req.body.name;

      const result = await Users.find({
        name: {
          $regex: name,
        },
      }).sort();

      return SuccessMessage(result, res);
    } catch (err) {
      return ErrorMessage(err.message, res);
    }
  }
);

// [
//   {month :10 ,year:2023,date :"10/10/2033"}
// ]

// [
//   {month :11 ,year:2023,date :"10/10/2033"}
// ]
// [
//   {month :10 ,year:2023,date :"10/10/2033"}
// ]

router.get("/month", async (req, res) => {
  const month = 10,
    year = 2023;

  try {
    const result = await Users.find({
      monthlyPay: {
        $elemMatch: {
          month: "9",
          year: "2023",
        },
      },
    });

    return SuccessMessage(result, res);
  } catch (err) {
    return ErrorMessage(err.message, res);
  }
});

module.exports = router;
