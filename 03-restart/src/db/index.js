import mongoose from "mongoose";
import { DATABASE_NAME } from "../costants.js";

const connectToDatabase = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      console.log("MONGODB_URI environment variable is undefined");
      return;
    }

    const databaseConnection = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DATABASE_NAME}`
    );

    console.log(
      `MongoDB connected successfully. Host: ${databaseConnection.connection.host}`
    );
  } catch (databaseConnectionError) {
    console.log("MongoDB connection error:", databaseConnectionError);
    process.exit(1);
  }
};

export default connectToDatabase;
