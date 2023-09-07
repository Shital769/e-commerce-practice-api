import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import morgan from "morgan";
import express from "express";
const app = express();
const PORT = process.env.PORT || 8000;

//connect to database
import { connectDB } from "./src/config/dbConfig.js";
connectDB();

//middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

//Routers
import adminRouter from "./src/routers/AdminRouter.js";

app.use("/api/v1/admin", adminRouter);

//Root Url Request
app.use("/", (req, res, next) => {
  const error = {
    message: "You don't have permission here!",
  };
  res.json(error);
});

//Global error handler
app.use((error, req, res, next) => {
  const statusCode = error.errorCode || 404;
  res.status(statusCode).json({
    status: "error",
    message: error.message,
  });
});

//Run the Server
app.listen(PORT, (error) => {
  error
    ? console.log(error)
    : console.log(`Server is runnig at http://localhost:${PORT}`);
});
