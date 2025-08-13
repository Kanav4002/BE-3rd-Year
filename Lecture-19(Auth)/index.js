const express = require("express");
const connectDB = require("./db/connectDb")
const app = express();
const port = 4000;
require("dotenv").config();
const path = require("path");

app.use(express.json);
app.use(express.urlencoded({ extended: true}));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => { });

connectDB().then(() => {
  app.listen(port, () => console.log(`Server is running on http://localhost:${port}`));
}).catch((err) => {
  console.log(err);
});
