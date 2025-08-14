const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/user.model");
/*
  hashPass: encrypted password
  password: original password
  10: 2^10 times hashing
*/

router.post("/signup", async(req, res) => {
  try {
    const {name, email, password} = req.body;
    if (!name || !email || !password) {
      throw new Error("All fields are required");
    }
    const hashPass = await bcrypt.hash(password, 10);

    const user = await User.create({
      name: name,
      email: email,
      password: hashPass,
    })
    res.status(201).json({user, message: "user created successfully"});
  } catch (error) {
    res.status(500).json({message:error.message});
  }
});

router.post("/login", async(req, res) => {
  try {
    const {email, password} = req.body;
    if (!email || !password) {
      throw new Error("All fields are required");
    }
    const user = await User.findOne({email: email}).select("+password");
    if (!user) {
      throw new Error("Invalid email or password");
    }
    const isMatched = await bcrypt.compare(password, user.password);
    if(!isMatched) {
      throw new Error("Invalid email or password");
    }
    res.status(200).json({message: "You are logged in"});
  } catch (error) {
    res.status(400).json({message: error.message});
  }
})

module.exports = router;