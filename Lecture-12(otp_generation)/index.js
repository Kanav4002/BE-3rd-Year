const express = require("express");
const app = express();
const port = 3000;
const otpRouter = require("./routes/otp.routes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/otp", otpRouter);

app.get("/", (req, res) => { });

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
