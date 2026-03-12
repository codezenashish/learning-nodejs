import { application } from "./app.js";
import connectToDatabase from "./db/index.js";
import dotenv from "dotenv";

/*
-----------------------------------------
LOAD ENVIRONMENT VARIABLES
-----------------------------------------
*/
dotenv.config({
  path: "./.env",
});

/*
-----------------------------------------
SERVER CONFIGURATION
-----------------------------------------
*/
const SERVER_PORT = process.env.PORT || 8000;

/*
-----------------------------------------
DATABASE CONNECTION + SERVER START
-----------------------------------------
*/
connectToDatabase()
  .then(() => {
    application.listen(SERVER_PORT, () => {
      console.log(`Server is running on port: ${SERVER_PORT}`);
    });
  })
  .catch((databaseConnectionError) => {
    console.error("MongoDB connection failed:", databaseConnectionError);
  });
