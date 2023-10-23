const { body } = require("express-validator");

const createValidator = async (req, res, next) => {
  await body("name").notEmpty().withMessage("Name is required").run(req);

  await body("phoneNumber")
    .notEmpty()
    .withMessage("Phone Number is empty")
    .isMobilePhone()
    .withMessage("Phone number is not valid")
    .run(req);

  await body("emiStartDate")
    .notEmpty()
    .withMessage("Emi start date is empty")
    .isDate({ format: "DD-MM-YYYY" })
    .withMessage("Emi start date is invalid")
    .run(req);

  await body("password")
    .notEmpty()
    .withMessage("password is empty")
    .isStrongPassword()
    .withMessage("password is weak")
    .run(req);

  await body("loanTenure")
    .notEmpty()
    .withMessage("Loan Tenure is empty")
    .isNumeric()
    .withMessage("Loan Tenure is invalid")
    .run(req);

  await body("interestRate")
    .notEmpty()
    .withMessage("Interest rate is empty")
    .isFloat()
    .withMessage("Interset rate should be float")
    .run(req);

  next();
};

const searchValidator = async (req, res, next) => {
  await body("name")
    .notEmpty()
    .withMessage("Name is Empty")
    .custom((value) => {
      console.log(!value);
      if (!value) throw new Error("Name is not valid");
      return true;
    })
    .run(req);

  next();
};

const getByMonthValidator = async (req, res, next) => {
  await body("month")
    .notEmpty()
    .withMessage("month is empty")
    .isInt({ max: 11, min: 0 })
    .withMessage("Month should be in range 0-11")
    .run(req);

  await body("year")
    .notEmpty()
    .withMessage("year is empty")
    .isInt({ max: 2030, min: 2015 })
    .withMessage("Year should be in range 2015-2030")
    .run(req);

  next();
};

const updateValidator = async (req, res, next) => {
  await body("id")
    .notEmpty()
    .withMessage("Id is empty")
    // .isArray()
    // .withMessage("Ids should be array")
    .run(req);

  await body("amountPaid")
    .notEmpty()
    .withMessage("amount paid is empty")
    .run(req);

  await body("paid")
    .notEmpty()
    .withMessage("paid is empty")
    .isBoolean()
    .withMessage("paid is invalid")
    .run(req);

  next();
};

module.exports = {
  createValidator,
  searchValidator,
  updateValidator,
  getByMonthValidator,
};
