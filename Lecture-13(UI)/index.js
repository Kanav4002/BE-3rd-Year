const express = require("express");
const app = express();
const PORT = 3000;
const path = require("path");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static()) : redirect "/" get req to public folder
// __dirname : tells the path to the directory
// path.json : Provides absolute path of public 
app.use(express.static(path.join(__dirname, "public")));

// This API is useless as we directed the "/" get req to public folder
app.get("/", (req, res) => {
  
});

app.get("/user", (req, res) => {
  let user = {
    name: "user 1",
    age: 21,
    branch: "CSE",
  }
  res.status(200).json({user});
});

app.get("/contact", (req, res) => {
  // res.redirect("contact.html"); : redirect the API call to contact.html
  res.redirect("contact.html");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
})