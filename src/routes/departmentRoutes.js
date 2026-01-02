import express from "express";
import {
  createDepartment,
  getDepartments,
} from "../controllers/departmentController.js";

import protect from "../middlewares/authMiddleware.js";
import authorize from "../middlewares/authorizeMiddleware.js";

const router = express.Router();

router.use(protect);
router.use(authorize("admin"));

router.post("/", createDepartment);
router.get("/", getDepartments);

export default router;
