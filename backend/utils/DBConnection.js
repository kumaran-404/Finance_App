const mongoose = require("mongoose");
const url = process.env.DATABASE_URL;

const connect =  () => {
  mongoose.connect(url);

  const connection = mongoose.connection;

  connection.on("error", (message) => {
    console.log(message);
  });

  connection.once("open", (message) => {
    console.log("DataBase Connected ");
  });
};

module.exports = connect();
