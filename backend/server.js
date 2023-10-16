const app = require("express")();
const dotenv = require("dotenv");
dotenv.config();
const DBConnection = require("./utils/DBConnection");

app.listen(process.env.PORT, (err) => {
  if (!err) console.log("Server Started ", process.env.PORT);
});
