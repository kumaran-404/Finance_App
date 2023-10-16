const express = require("express")
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const DBConnection = require("./utils/DBConnection");
const userRoutes = require("./routes/UserRoutes")

app.use(express.json())

app.use("/api/users" , userRoutes)

app.listen(process.env.PORT, (err) => {
  if (!err) console.log("Server Started ", process.env.PORT);
});
