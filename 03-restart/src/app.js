import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

/*
-----------------------------------------
APPLICATION INSTANCE
-----------------------------------------
*/
const application = express();

/*
-----------------------------------------
CONFIGURATION CONSTANTS
-----------------------------------------
*/
const REQUEST_BODY_SIZE_LIMIT = "16kb";
const STATIC_FILES_DIRECTORY = "public";

/*
-----------------------------------------
CORS MIDDLEWARE
-----------------------------------------
*/
application.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

/*
-----------------------------------------
REQUEST PARSERS
-----------------------------------------
*/
application.use(express.json({ limit: REQUEST_BODY_SIZE_LIMIT }));
application.use(
  express.urlencoded({ extended: true, limit: REQUEST_BODY_SIZE_LIMIT })
);

/*
-----------------------------------------
COOKIE PARSER
-----------------------------------------
*/
application.use(cookieParser());

/*
-----------------------------------------
STATIC FILES
-----------------------------------------
*/
application.use(express.static(STATIC_FILES_DIRECTORY));
import userRouter from "./routes/user.routs.js";
// routes declaration
application.use("/api/v1/users", userRouter);

export { application };
