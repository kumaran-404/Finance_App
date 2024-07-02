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

const sequelize = new Sequelize("postgres://avnadmin:AVNS_bJJpBz8bhaFrFdlt7gX@pg-2e7c97bd-kumaranb577-96c1.e.aivencloud.com:18768/defaultdb?sslmode=no-verify",
  {
     username : "avnadmin",
     port : 18768,
     host : "pg-2e7c97bd-kumaranb577-96c1.e.aivencloud.com",
     database : "defaultdb" ,
     password : "AVNS_bJJpBz8bhaFrFdlt7gX",
     dialect: "postgres",
     dialectOptions: {
      ssl: { rejectUnauthorized: false }
     },
   
  }
)

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
