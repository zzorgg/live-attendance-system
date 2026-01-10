import { Router } from "express";

const router = Router();

const health = router.get("/health", (_req, res) => {
  res.json({
    status: "healthy",
  });
});

export default health;
