// destructuring
const { log } = require("console");
const { formatDate, dateConverter } = require("./helper/date-converter");
const fs = require("fs");

let date = formatDate(new Date());
// console.log(date);

let localeDate = dateConverter(new Date());
// console.log(localeDate);

// Read, Write in a file

/*
  Two Types : 
  - Synchronous : Blocked Operations
  - Asynchronous : Non-Blocked Operations
*/

// console.log(1);

// async approach
// // runs on Web API
// When its done, its callback function will go to main Stack.
// fs.writeFile("./text.txt", "hello world!!!", (err) => {
//   console.log(err);
//   console.log("done");
// });

// console.log(2);

// console.log(1);
// const result = fs.writeFileSync("./text2.txt", "hello warld!!!");
// console.log(result);
// console.log(2);

console.log(1);
// // Async
fs.readFile("./text.txt", "utf-8", (err, data) => {
  console.log("Async", data);
})

console.log(2);
// Sync 
// const data = fs.readFileSync("./text.txt", "utf-8");
// console.log("Sync", data);

// to update file, Async
// fs.appendFile("./text.txt", "\nyo wassup gang", (err) => {
//   console.log(err);
//   console.log("done");
// });

// to update file
// Sync
// const result = fs.appendFileSync("./text.txt", "\nyo wassup gang");
// console.log(result);

// Delete file
// Async
// fs.unlink("./text.txt", (err) => {
//   console.log(err);
//   console.log("done");
// })

// // Sync
// const result2 = fs.unlinkSync("./text2.txt");
// console.log(result2);