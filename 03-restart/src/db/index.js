import mongoose from "mongoose";
import { DB_NAME } from "../costants.js";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );
    console.log(
      `\. mongoDB connected !! host: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("mongoDB connection error", error);
    Process.exit(1);
  }
};
export default connectDB;
