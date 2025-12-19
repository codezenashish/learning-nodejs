// require('dotenv').config()

import dotenv from "dotenv";
import mongoose from "mongoose";
import { DB_NAME } from "./contants.js";
import connectDB from "./db/index.js";

dotenv.config({
  path: "./env",
});
connectDB();



(async () => {
  try {
   await mongoose.connect(`${process.env.MOGODB_URL}/${DB_NAME}`);
  } catch (error) {
    console.log("error", error);
    throw error;
  }
})();


