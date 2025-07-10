const express = require("express");
const app = express();

app.use((req, res, next) => {
  console.log("generic middleware");
  next(); // to pass the api request
})

// this middleware will not run as req is stuck in app.get() 
app.use((req, res, next) => {
  console.log("generic middleware 2");
  next();
}) 

app.get("/user", (req, res) => {
  // console.log(req.query);
  // console.log(req.query.name);
  const { name, number, group} = req.query;
  console.log(name, number, group);
  res.status(200).send("ok");
})

// use case in react
app.get("/user/:id", (req, res) => {
  // console.log(req.params); // // {9999}
  const { id } = req.params;
  console.log(id);
  res.status(200).send("ok");
})

// app.get("/user/:id/:payment_id", (req, res) => {
//   // console.log(req.params); // // {9999}
//   const { id , payment_id } = req.params;
//   console.log(payment_id);
//   res.status(200).send("ok ok");
// })

app.listen(4000, () => {
  console.log("Server is running on port 4000");
})