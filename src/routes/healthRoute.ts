import { Router } from "express";

const router = Router();

const health = router.get("/health", (req, res) => {
  req.log.info("health check: /health");
  res.status(200).json({
    status: "operational",
  });
});

export default health;
