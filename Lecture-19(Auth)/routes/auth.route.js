const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const verifyAuth = require("../middleware/auth.middleware");
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

/*
  id: user._id, name: user.name -> paylod : current user basic info
  process.env.JWT_SECRET -> secret : signature which is added to token (encrypted)
  {expressIn:  '1h', algorithm: 'RS256'} : optionals


  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9. -> headers : algorithm
  
  -> Payload (encrypted form of data) : easily decodeable
  eyJpZCI6IjY4OWQ2NDRjY2QxNjZlYjNkYWZiNzVjNSIsIm5hbWUiOiJLYW5hdiIsImlhdCI6MTc1NTQ5MTk4OSwiZXhwIjoxNzU1NDk1NTg5fQ.  
  
  -> Signature : encrypted form of JWT secret (not decodeable)
  MUJpgpg5-MJmJNnls5bT-GlAazVKvYDhMunyA7EmDQQ
*/

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
    const token = jwt.sign({id: user._id, name: user.name}, process.env.JWT_SECRET,
      {expiresIn:  '1h', algorithm: 'HS256'}
    );
    res.cookie("token", token, {httpOnly: true, secure: true, maxAge: 24*60*60*1000});
    res.status(200).json({message: "You are logged in", token: token});
  } catch (error) {
    res.status(400).json({message: error.message});
  }
})

router.get("/check", verifyAuth, async(req, res) => {
  try {
    const userData = req.user;
    res.status(200).json({user: userData});
  } catch (error) {
    res.status(400).json({message: error.message});
  }
})

module.exports = router;