const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
const connectDB = require("./db/connectDb");
const User = require("./models/user.Schema");

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

require("dotenv").config();

app.post("/", async (req, res) => {
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

connectDB().then(() => {
  app.listen(port, async () => {
    console.log(`Server is running on port http://localhost:${port}`);
  })
});

module.exports = connectDB;
