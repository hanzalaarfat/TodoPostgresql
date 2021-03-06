const express = require("express");
const router = express.Router();
const authmiddelware = require("../middleware/authmiddle");
const userController = require("../controller/userController");
const todoController = require("../controller/todoController");
router.post("/signup", userController.Signup);
router.post("/login", userController.Login);
router.post("/add", todoController.AddTodo);
router.get("/tem", authmiddelware.verifyToken, userController.Temp);

module.exports = router;
