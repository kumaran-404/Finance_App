const mongoose = require("mongoose");
const url = "mongodb://123";

const connect =  () => {
  mongoose.connect(url);

  const connection = mongoose.connection;

  connection.on("error", (message) => {
    console.log(message);
  });

  connection.on("an")

  connection.once("open", (message) => {
    console.log("hi");
  });
};

module.exports = connect();
