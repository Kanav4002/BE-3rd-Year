const express = require("express");
const router = express.Router();
const { otpGenerator, otpVerify } = require("@kanav5753/otp-handler");

router.get("/generate", async (req, res) => {
  try {
    let otp = otpGenerator(6);
    res.status(200).json({ otp });
  } catch (error) {
    res.status(500).json({ message : error.message });
  }
});

router.post("/verify", (req, res) => {
  try {
    const { otp } = req.body;
    const isMatched = otpVerify(otp);
    if (isMatched) {
      return res.status(200).json({ message: "OTP verified" });
    } 
    throw new Error( "OTP not matched") // to generate error by self
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;