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
    isPaid: {
      type: DataTypes.BOOLEAN,
    },
  },
  { freezeTableName: true }
);

// define one to many relationship
User.Emi.hasMany(Pay);
Pay.belongsTo(User.Emi);

module.exports = Pay;
