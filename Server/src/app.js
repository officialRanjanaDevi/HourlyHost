import express from "express";
import dotenv from "dotenv";
dotenv.configDotenv({
  path: ".env",
});

import cors from "cors";
import cookieParser from "cookie-parser";
import { ApiError } from "./utils/ApiError.js";
const app = express();
app.use(cookieParser());

app.use(cors({
  origin: ['http://localhost:5173',"*"], 
  credentials: true, 
}));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

//routes declaration
app.get("/", (req, res) => {
  res.send("Welcome to Hourly host!")
 });
import authRouter from "./routes/user.routes.js";
app.use("/auth",authRouter)
import partnerRouter from "./routes/partner.routes.js";
app.use("/partner",partnerRouter)

app.use((err, req, res, next) => {

  if (err instanceof ApiError) {

    res.status(err.statusCode).json({
      status:err.statusCode,
      success: false,
      message: err.message,
      errors: err.errors,
    });
  } else {
  
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

export { app };
