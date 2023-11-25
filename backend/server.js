const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const DBConnection = require("./utils/DBConnection");
const userRoutes = require("./routes/UserRoutes");
const authRoutes = require("./routes/authRoutes");
const { ErrorMessage,tokenErrorMessage } = require("./utils/handler");
const { getToken } = require("./validators/token");
const cors = require("cors");
const path = require('path');

app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);

require("./models/User");

console.log(path.dirname(__filename))

app.use(express.static("../frontend/web-build"));

console.log(__dirname)
app.get('/', function (req, res) {
  res.sendFile( '../frontend/web-build/index.html');
});

app.use("/api/auth", authRoutes);

// app.use((req, res, next) => {
//   try {
//     const token = getToken(req);

//     if (!token) return tokenErrorMessage( res);

//     res.locals.data = token;

//     next();
//   } catch (err) {
//     return ErrorMessage(err.message, res);
//   }
// });

app.use("/api/users", userRoutes);

app.listen(80, (err) => {
  if (!err) console.log("Server Started ", 80);
});
