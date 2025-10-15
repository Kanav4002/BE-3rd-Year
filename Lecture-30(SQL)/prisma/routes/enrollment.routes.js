const express = require('express');
const prisma = require('../client');
const router = express.Router();

router.post("/create", async(req, res) => {
  try {
    const { userId, courseId } = req.body;
    const enrollment = await prisma.enrollment.create({
      data: {
        userId,
        courseId
      }
    })
    res.status(200).json({ enrollment });
  } catch (error) {
    res.status(400).json({ message: error.message });
  } 
});

module.exports = router;