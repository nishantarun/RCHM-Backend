import express from "express";
import protect from "../middlewares/authMiddleware.js";
import authorize from "../middlewares/authorizeMiddleware.js";

const router = express.Router();

router.get("/dashboard", protect, authorize("admin"), (req, res) => {
  res.json({
    success: true,
    message: "Welcome admin",
  });
});

export default router;
