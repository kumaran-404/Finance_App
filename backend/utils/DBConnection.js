const { Sequelize } = require("sequelize");

// const sequelize = new Sequelize({
//   username: "kumaran",
//   password: "kumaran",
//   database: "BV_Finance",
//   host: "localhost",
//   dialect: "postgres",
//   pool: {
//     max: 5,
//     min: 0,
//     acquire: 30000,
//     idle: 10000,
//   },
// });

const sequelize = new Sequelize("postgres://aodssokt:b5gyC4NU-aew93nDmTZhHJasphSmU75k@isabelle.db.elephantsql.com/aodssokt")

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database: ", error);
  });

//sequelize.sync({ force: true }).then(() => console.log("Deleted all"));
sequelize
  .sync()
  .then(() => {
    console.log("Tables created successfully");
  })
  .catch((error) => {
    console.error("Error creating tables:", error);
  });

module.exports = sequelize;
