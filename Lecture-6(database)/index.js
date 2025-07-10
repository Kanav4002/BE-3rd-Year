const express = require("express");
const app = express();
const PORT = 3000;
const { MongoClient } = require("mongodb");
require("dotenv").config();

// Connection URL
const client = new MongoClient(process.env.DATABASE_URL);

let userCollection;
async function main() {
  await client.connect();
  const db = client.db("G24");
  userCollection = db.collection("users");
  return "done";
}

app.listen(PORT, () => {
  main().then(() => console.log("db connected"))
  .catch((err) => console.log(err));
  console.log(`Server is live on http://localhost:${PORT}`);
})