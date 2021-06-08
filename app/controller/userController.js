const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
var secret = process.env.SECRET;

exports.Signup = (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.send("properly data filed ");
  }

  const user = {
    name,
    email,
    password: bcrypt.hashSync(req.body.password, 8),
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

  let user = await User.findOne({
    where: { email: email },
  });

  if (!user) {
    res.status(500).send({
      message: "Error retrieving User ",
    });
  }

  if (user) {
    var passwordIsValid = bcrypt.compareSync(password, user.password);

    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password Or Email! ",
      });
    }
    //res.status(200).json({ message: "ssssssss" });

    var token = jwt.sign({ id: user.id }, secret, {
      expiresIn: 86400, // 24 hours
    });
    res.status(200).send({
      user,
      accessToken: token,
    });
  }
};

exports.Temp = (req, res) => {
  res.send({ user: req.user, message: "Hllo" });
};
