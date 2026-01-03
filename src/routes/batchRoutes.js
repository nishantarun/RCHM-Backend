import express from "express";
import {
  createBatch,
  getBatches,
  getStudentsByBatch,
} from "../controllers/batchController.js";

import protect from "../middlewares/authMiddleware.js";
import authorize from "../middlewares/authorizeMiddleware.js";

const router = express.Router();
router.use(protect);
router.use(authorize("admin"));

router.post("/", createBatch);
router.get("/", getBatches);
router.get("/:id/students", getStudentsByBatch);

export default router;
