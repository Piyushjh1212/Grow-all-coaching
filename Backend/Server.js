import express from "express";
import cors from "cors";
import dotenv from 'dotenv';
import helmet from "helmet";
import cookieParser from "cookie-parser";
import { customSanitize } from "./Middleware/CustomSanitizeMiddleware.js";
import UserLoginSignup from "./Routes/UserLoginSignup.js";
import connectDB from "./Config/connect.db.js";

const app = express();

dotenv.config();      // 1️⃣ sabse pehle env load
connectDB();

app.use(helmet()); 

app.use(
  cors({
    origin: "http://localhost:5173", // React URL  // if Live www.xxxxx.com 
    credentials: true,
  })
);

app.use(cookieParser());

app.use(express.json());

app.use(customSanitize); 

app.get("/api/v1/UserLoginSignup", UserLoginSignup);



app.listen(5000, () => {
  console.log("Server running on port 5000");
});