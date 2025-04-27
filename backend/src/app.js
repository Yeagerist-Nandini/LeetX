import express from "express";
import dotenv, { config } from "dotenv";
import cookieParser from "cookie-parser";
import healthCheckRouter from "./routes/healthcheck.routes.js";

dotenv.config();

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/api/v1",healthCheckRouter);

export default app;