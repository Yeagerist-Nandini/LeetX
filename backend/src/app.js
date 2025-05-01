import express from "express";
import dotenv, { config } from "dotenv";
import cookieParser from "cookie-parser";
import healthCheckRouter from "./routes/healthcheck.routes.js";
import authRoutes from "./routes/auth.routes.js"
import problemRoutes from "./routes/problem.routes.js"
import executionRoutes from "./routes/executeCode.routes.js"

dotenv.config();

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/api/v1",healthCheckRouter);

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/problems", problemRoutes);
app.use("/api/v1/execute-code",executionRoutes);

export default app;