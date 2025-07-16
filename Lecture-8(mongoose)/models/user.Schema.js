const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  // name: String,
  name: {
    type: String,
    required: true, // makes an attribute compulsory
    minLength: 3, // name can't be less than 3 characters
    trim: true // remove white spaces
  },
  email: {
    type: String,
    required: true,
    unique: true, // email must be unique
  },
  age: {
    type: Number,
    required: true,
    min: 1, // min value of age possible
    max: 124, // max value of age possible
  },
  DOB: {
    type: Date,
    required: true

  }
})

const User = mongoose.model("User", userSchema);

module.exports = User;