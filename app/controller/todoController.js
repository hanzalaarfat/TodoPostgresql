const db = require("../models");
const { use } = require("../routes/todoRoute");
const Todo = db.todos;
const Op = db.Sequelize.Op;

////////////// add Todo//////////////

exports.AddTodo = (req, res) => {
  const { title, description, userId } = req.body;
  if (!title || !description || !userId) {
    res.send("properly data filed ");
  }

  const todo = {
    title,
    description,
    userId,
  };

  // Save Tutorial in the database
  Todo.create(todo)
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

////////////// find  Todo by user id//////////////

exports.GetAllTodoOfUser = (req, res) => {
  let userid = req;
  console.log(userid);
  res.send(userid);
};
