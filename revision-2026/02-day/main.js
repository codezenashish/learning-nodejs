import * as fs from "fs";
fs.writeFile("write.txt", "hello i am ashish", (err) => {
  if (err) {
    console.log(err);
  }
});
setTimeout(() => {
  console.log("hello i am ashish");
}, 2000);

let count = 0;
console.log(count);

const intervel = setInterval(() => {
  console.log(` intevel count ${++count}`);
  if (count === 4) {
    clearInterval(intervel);
  }
}, 1111);
