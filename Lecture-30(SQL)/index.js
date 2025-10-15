const express = require("express");
const app = express();
const PORT = 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const userRouter = require("./prisma/routes/user.routes");
const postRouter = require("./prisma/routes/post.routes");
const commentRouter = require("./prisma/routes/comment.routes");
const courseRouter = require("./prisma/routes/course.routes");
const enrollmentRouter = require("./prisma/routes/enrollment.routes");

app.use("/user", userRouter);
app.use("/post", postRouter);
app.use("/comment", commentRouter);
app.use("/course", courseRouter);
app.use("/enrollment", enrollmentRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => console.log("Server running on port " + PORT));

