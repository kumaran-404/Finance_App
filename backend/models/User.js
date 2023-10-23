const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../utils/DBConnection");

const User = sequelize.define(
  "User",
  {
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
    emiStartDate: {
      type: DataTypes.DATE,
    },
    loanTenure: {
      type: DataTypes.INTEGER,
    },
    interestRate: {
      type: DataTypes.FLOAT,
    },
    totalAmount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    remainingAmount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    monthlyAmount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  { freezeTableName: true }
);

module.exports = User;
