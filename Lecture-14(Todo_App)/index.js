const express = require("express");
const connectDB = require("./db/connectDb");
const app = express();
const PORT = 3000;
require("dotenv").config();
const path = require("path");

// routers
const todoRouter = require("./routes/todo.routes");

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "public")));

// routes
app.use("/todo", todoRouter);

app.get("/", (req, res) => {
  
});

connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
}).catch((err) => {
  console.log(err);
});
