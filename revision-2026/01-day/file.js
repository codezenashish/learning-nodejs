import fs from "node:fs";

// sync blocking code , async non blocking code

// Write

// fs.writeFileSync("./text.txt", "hello i am Ashish"); // this is the sync  writing

//  fs.writeFile("./text.txt", "i am async write file", (err) => {
//   console.log(err,"ye");
// });

// Read
//
// const data = fs.readFileSync("./text.txt", "utf8");
// console.log(data);

// fs.readFile("./text.txt", "utf8", (err, res) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(res);
//   }
// });

// append / update

// fs.appendFileSync("./text.txt", new Date().toDateString())

// fs.appendFile(
//   "./log.txt",
//   `user is logged in at ${new Date().toDateString()}\n`,
//   "utf8",
//   (err, res) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log(res);
//     }
//   },
// );

// fs.mkdir("./One", (err) => {
//   console.log(err);
// });

fs.mkdirSync("./mkdir");
