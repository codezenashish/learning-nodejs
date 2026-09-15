import * as http from "http";
import * as fs from "fs";

const PORT = 8000;
const myServer = http.createServer((req, res) => {
  const log = `${Date.now()} from ${req.url} new request\n`;
  fs.appendFile("log.txt", log, (err) => {
    if (err) {
      console.error("error write to the log file", log);
      res.statusCode(500);
      res.end("internal server error");
    }
  });
});

myServer.listen(PORT, () => {
  console.log(`server is connected at ${PORT}`);
});
