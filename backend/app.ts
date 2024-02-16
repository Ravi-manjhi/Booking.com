import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import path from "path";
import "dotenv/config";

import userRouter from "./routes/auth.router";
import myHotelRouter from "./routes/myHotels.router";

const app = express();
if (process.env.NODE_ENV !== "PRODUCTION") {
  app.use(morgan("dev"));
  app.use(
    cors({
      origin: process.env.FRONTEND_URL,
      credentials: true,
    })
  );
} else {
  app.use(morgan("short"));
  app.use(cors());
}

app.use(express.static(path.join(__dirname, "../../frontend/dist")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

//====================================== routers =========================
app.use("/api/auth", userRouter);
app.use("/api/hotel", myHotelRouter);

export default app;
