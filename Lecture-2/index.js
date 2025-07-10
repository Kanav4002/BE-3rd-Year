const express = require("express");
const app = express();

app.get("/", (req, res) => {
  // res.send("Server is live");
  const result = {
    name : "nothing",
    work : null
  }
  res.json(result);aq
});

app.use(express.json()); // to parse the body of the request in json format.

app.post("/", (req, res) => {
  console.log(req.body);
  res.send("ok")
})

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});




