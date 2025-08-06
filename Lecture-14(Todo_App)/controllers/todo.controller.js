// const Todo = require('../models/todo.model');

// // Get all todos
// exports.getAllTodos = async (req, res) => {
//   try {
//     let todos = await Todo.find();
//     res.status(200).json({ todos });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Create a new todo
// exports.createTodo = async (req, res) => {
//   try {
//     const { task } = req.body;
//     let todo = await Todo.create({ task: task });
//     res.status(200).json({ todo });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Delete a todo
// exports.deleteTodo = async (req, res) => {
//   try {
//     const { id } = req.params;
//     await Todo.findByIdAndDelete(id);
//     res.status(200).json({ message: "Todo deleted succesfullly" });
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// // Update a todo 
// exports.updateTodo = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const todo = await Todo.findById(id);
//     todo.status = !todo.status;
//     await todo.save();
//     res.status(200).json({ message: "Todo updated successfully" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Filter todos
// exports.filterTodos = async (req, res) => {
//   try {
//     const { filterName } = req.query;
//     if (!filterName) {
//       throw new Error("Filter name is required");
//     }
//     if (filterName === "all") {
//       const todos = await Todo.find();
//       return res.status(200).json({ todos });
//     }
//     const todos = await Todo.find({ status: (filterName === "active" ? true : false) });
//     return res.status(200).json({ todos });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

