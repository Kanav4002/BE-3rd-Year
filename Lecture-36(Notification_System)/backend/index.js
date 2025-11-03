const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const cors = require("cors");
const io = require('socket.io')(server,{
  cors: {
    origin: ["http://localhost:3000"],
    methods: "GET, POST"
  }
});
const path = require("path");
const PORT = 4000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// "username" : "socket.io"
const Users = {

};

const Posts = []


io.on('connection', client => {
  console.log("server side connection",client.id);

  // register user
  client.on("register", (username) => {
    if (Users[username]) {
      return;
    }
    Users[username] = client.id
  })

  // client.on('disconnect', () => {
  //   console.log("user 1 disconnected");
  //  });

  //  client.emit("notice", { message: "this is the data send by the server" });

  //  client.on("client-event", (data1, data2, data3) => {
  //   console.log(data1, data2, data3);
  //  });
});

app.get("/", (req, res) => {
  res.send("hello");
});

app.post("/create", async(req, res) => {
  try {
    const { username, content } = req.body;
    const post = {
      author: Users[username],
      content,
      likes: [],
      createdAt: new Date()
    }
    // opposite of push
    Posts.unshift(post);
    res.status(201).json({ post: Posts });
  } catch(error) {
    res.status(400).json({ message: error.message });
  }
});

server.listen(PORT, () => console.log("Server running on port " + PORT));