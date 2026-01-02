import express from "express";
import { createBatch, getBatches } from "../controllers/batchController.js";

import protect from "../middlewares/authMiddleware.js";
import authorize from "../middlewares/authorizeMiddleware.js";

const router = express.Router();
router.use(protect);
router.use(authorize("admin"));

router.post("/", createBatch);
router.get("/", getBatches);

export default router;
