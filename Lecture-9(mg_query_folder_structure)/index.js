const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
const connectDB = require("./db/connectDb");
const User = require("./models/user.Schema");
const bulkUserUpload = require("./db/seed");
const userRouter = require("./routes/user.routes");
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use("/user", userRouter);

app.post("/user/create", async (req, res) => {
  try {
    const { name, email, age, DOB } = req.body;
    const user = await User.create({
      name: name,
      email: email,
      age: age,
      DOB: new Date(DOB),
    });
    res.status(201).json({user});
  } catch (error) {
    res.status(400).json({message: error.message});
  }
})

app.get("/user/bulk/upload", async (req, res) => {
  try {
    await bulkUserUpload();
    res.status(200).json({message: "users uploaded successfully"});
  } catch (error) {
    res.status(500).json({message: error.message});
  }
})

require("dotenv").config();

connectDB().then(() => {
  app.listen(port, async () => {
    console.log(`Server is running on port http://localhost:${port}`);
  })
});

module.exports = connectDB;
