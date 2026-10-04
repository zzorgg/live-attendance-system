import cors from "cors";
import express from "express";
import helmet from "helmet";
import connectDB from "./config/db";
import { errorHandler } from "./middleware/errorHandler";
import httpLogger from "./middleware/httpLogger";
import { signup } from "./routes/auth/authRoutes";
import health from "./routes/healthRoute";
import { errorResponse, successResponse } from "./utils/apiResponse";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);

app.use(helmet());
app.use(httpLogger);

connectDB();

app.get("/", (req, res) => {
  req.log.info("root: /");
  successResponse(res, {
    status: "ok",
    name: "live-attendance-system",
    version: "1.0.0",
  }, 200)
});

app.use(health);
app.use("/auth", signup);
app.use(errorHandler);

export default app;
