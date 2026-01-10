import express from "express";
import helmet from "helmet";
import cors from "cors";
import connectDB from "./config/db";
import health from "./routes/healthRoute";
import { signup, login, me } from "./routes/auth/authRoutes";

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());

connectDB();

app.get("/", (_req, res) => {
  res.json({
    status: "ok",
    name: "live-attendance-system",
    version: "1.0.0",
  });
});

app.use(health);
app.use("/auth", signup);
app.use("/auth", login);
app.use("/me", me);

export default app;
