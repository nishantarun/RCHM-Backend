import Batch from "../models/Batch.js";
import Course from "../models/Course.js";
import Student from "../models/Student.js";

export const createBatch = async (req, res, next) => {
  const { name, course, startDate, endDate, capacity } = req.body;

  if (!name || !course || !startDate || !endDate || !capacity) {
    res.status(401);
    return next(new Error("All fields are required"));
  }

  const existingCourse = await Course.findById(course);
  if (!existingCourse) {
    res.status(404);
    return next(new Error("Course not found"));
  }

  const batch = await Batch.create({
    name,
    course,
    startDate,
    endDate,
    capacity,
    createdBy: req.user.id,
  });

  res.status(201).json({
    success: true,
    data: batch,
  });
};

export const getBatches = async (req, res) => {
  const filter = {};

  if (req.query.course) {
    filter = req.query.course;
  }

  const batches = await Batch.find(filter)
    .populate("course", "name code durationInMonths")
    .sort("startDate");

  res.json({
    success: true,
    count: batches.length,
    data: batches,
  });
};

export const getStudentsByBatch = async (req, res) => {
  const students = await Student.find({ batch: req.params.id })
    .populate("user", "name email")
    .sort("createdAt");

  res.json({
    success: true,
    count: students.length,
    data: students,
  });
};
