const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const userRotes = require("./app/routes/userRoute");
const todoRotes = require("./app/routes/todoRoute");


const app = express();

const db = require("./app/models");
db.sequelize.sync();
/// request accept from client

// var corsOptions = {
//   origin: "http://localhost:8081",
// };

// app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use("/user", userRotes);
app.use("/todo", todoRotes);


// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Todo application." });
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
