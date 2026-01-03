import express from "express";
import { createStudent } from "../controllers/studentController.js";

import protect from "../middlewares/authMiddleware.js";
import authorize from "../middlewares/authorizeMiddleware.js";

const router = express.Router();

router.use(protect);
router.use(authorize("admin"));

router.post("/", createStudent);

export default router;
