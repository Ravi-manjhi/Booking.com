import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import "dotenv/config";
import path from "path";
import userRouter from "./routes/auth.router";

const app = express();
if (process.env.NODE_ENV === "DEV") {
  app.use(morgan("dev"));
}

app.use(express.static(path.join(__dirname, "../../frontend/dist")));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use("/api/auth", userRouter);

export default app;
