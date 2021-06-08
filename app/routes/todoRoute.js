const express = require("express");
const router = express.Router();
const authmiddelware = require("../middleware/authmiddle");
const todoController = require("../controller/todoController");

router.post("/add", todoController.AddTodo);

router.get("/getall/:id", todoController.GetAllTodoOfUser);

module.exports = router;
