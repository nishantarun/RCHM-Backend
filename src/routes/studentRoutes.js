import express from "express";
import {
  createStudent,
  getMyStudentProfile,
} from "../controllers/studentController.js";

import protect from "../middlewares/authMiddleware.js";
import authorize from "../middlewares/authorizeMiddleware.js";

const router = express.Router();

router.use(protect);
router.use(authorize("admin"));

router.post("/", createStudent);
router.get("/me", protect, getMyStudentProfile);

export default router;
