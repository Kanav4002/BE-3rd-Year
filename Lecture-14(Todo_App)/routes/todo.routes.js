const express = require("express");
const router = express.Router();
const todoController = require("../controllers/todo.controller");

router.get("/all", todoController.getAllTodos);
router.post("/create", todoController.createTodo);
router.delete("/delete/:id", todoController.deleteTodo);
router.put("/update/:id", todoController.updateTodo);
router.get("/filter", todoController.filterTodos);

module.exports = router;

