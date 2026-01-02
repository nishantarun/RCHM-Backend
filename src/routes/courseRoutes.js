import express from "express";
import { createCourse, getCourses } from "../controllers/courseController.js";

import protect from "../middlewares/authMiddleware.js";
import authorize from "../middlewares/authorizeMiddleware.js";

const router = express.Router();

router.use(protect);
router.use(authorize("admin"));

router.post("/", createCourse);
router.get("/", getCourses);

export default router;
