const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../utils/DBConnection");
const User = require("./User");

const Pay = sequelize.define(
  "Pay",
  {
    month: {
      type: DataTypes.INTEGER,
    },
    year: {
      type: DataTypes.INTEGER,
    },
    date: {
      type: DataTypes.INTEGER,
    },
    time: {
      type: DataTypes.TIME,
    },
    amountPaid: {
      type: DataTypes.INTEGER,
    },
  },
  { freezeTableName: true }
);

// define one to many relationship
User.hasMany(Pay);
Pay.belongsTo(User);

module.exports = Pay;
