const User = require("../models/user.model");

async function goldUserVerify(req, res, next) {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    if (user.package != "gold" && user.package != "platinum") {
      throw new Error("You don't have a package to access this")
    }
    next();
  } catch (error) {
    res.status(400).json({message: error.message});
  }
}

async function platinumUserVerify(req, res, next) {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    if (user.package != "platinum") {
      throw new Error("You don't have a package to access this")
    }
    next();
  } catch (error) {
    res.status(400).json({message: error.message});
  }
}

module.exports = {goldUserVerify, platinumUserVerify};