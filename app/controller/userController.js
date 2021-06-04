const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;

exports.Signup = (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.send("properly data filed ");
  }

  const user = {
    name,
    email,
    password,
  };

  // Save Tutorial in the database
  User.create(user)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial.",
      });
    });
};

///////////////////////////login ///////////////////

exports.Login = async (req, res) => {
  const { email, password } = req.body;
  await User.findOne({ email: email })
    .then(async (data) => {
      await User.findOne({ password })
        .then((data) => {
          res.status(200).json({ message: "Sucessfully login", data });
        })
        .catch((err) => {
          res.send("email Or passward Incorrect");
        });
    })
    .catch((err) => {
      res.send("email Or passward Incorrect");
    });
};
