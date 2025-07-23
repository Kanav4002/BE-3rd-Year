const express = require("express");
const User = require("../models/user.Schema");
const router = express.Router();

router.post("/user/create", async (req, res) => {
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

router.get("/user/bulk/upload", async (req, res) => {
  try {
    await bulkUserUpload();
    res.status(200).json({message: "users uploaded successfully"});
  } catch (error) {
    res.status(500).json({message: error.message});
  }
})

router.delete("/:id/delete", async (req, res) => {
  try {
    const {id} = req.params;
    // await User.findByIdAndDelete(id);
    const result = await User.deleteOne({_id : id});
    res.status(200).json({message: "user deleted successfully"});
  } catch (error) {
    res.status(500).json({message: error.message});
  }
})



module.exports = router;