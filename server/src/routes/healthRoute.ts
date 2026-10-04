import { Router } from "express";
import { successResponse } from "../utils/apiResponse";

const router = Router();

const health = router.get("/health", (req, res) => {
  req.log.info("health check: /health");
  successResponse(res, "operational", 200)
});

export default health;
