const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../utils/DBConnection");

const User = sequelize.define(
  "User",
  {
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    password: {
      type: DataTypes.STRING,
    },
    name: {
      type: DataTypes.STRING,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      unique: true,
    },
  },
  { freezeTableName: true }
);

const Emi = sequelize.define("Emi", {
  emiStartDate: {
    type: DataTypes.DATE,
  },
  loanTenure: {
    type: DataTypes.INTEGER,
  },
  interestRate: {
    type: DataTypes.FLOAT,
  },
  principal: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  totalAmount: {
    // loanTenure*monthlyAmount
    // with interest
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  monthsAlreadyPaid: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  remainingAmount: {
    // totalAmount - monthsAlreadyPaid*emi
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  monthlyAmount: {
    // emi
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
});

User.hasMany(Emi);

Emi.belongsTo(User);

module.exports = {
  User,
  Emi,
};
