import cors from "cors";
import express from "express";
import helmet from "helmet";
import connectDB from "./config/db";
import { errorHandler } from "./middlewear/error";
import httpLogger from "./middlewear/httpLogger";
import { signup } from "./routes/auth/authRoutes";
import health from "./routes/healthRoute";

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
  res.status(200).json({
    status: "ok",
    name: "live-attendance-system",
    version: "1.0.0",
  });
});

app.use(health);
app.use("/auth", signup);
app.use(errorHandler);

app.use((err: any, req: any, res: any, _next: any) => {
  req.log.error(err, "Unhandled error");
  res.status(500).json({ message: "Internal Server Error" });
});

export default app;
