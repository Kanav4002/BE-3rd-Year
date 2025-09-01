const express = require("express");
const connectDB = require("./db/connectDb");
const app = express();
const PORT = 4000;
const path = require("path");
const cookieParser = require("cookie-parser");
require("dotenv").config();

// routers
const authRouter = require("./routes/auth.route")
const productRouter = require("./routes/product.route");
const userRouter = require("./routes/user.route");
const verifyAuth = require("./middleware/auth.middleware");
const Product = require("./models/product.model");

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// https://quickref.me/ejs.html for reference
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// routes
app.use("/auth",authRouter);
app.use("/product",productRouter);
app.use("/user",userRouter);
app.get("/", verifyAuth, async(req, res) => {	
  // const name = "Kanav";
  // const contacts = [{name: "user 1", contact: 9293917375}, {name: "user 2", contact: 6294337590}]
  // res.render("home", {name: name, myContacts: contacts});
  const products = await Product.find();
  res.render("home", {products});
});

connectDB().then(()=>{
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
}).catch((error)=>console.log(error));

