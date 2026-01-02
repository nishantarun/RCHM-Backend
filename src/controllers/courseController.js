import Course from "../models/Course.js";

export const createCourse = async (req, res, next) => {
  const { name, code, credits, semester, department } = req.body;

  if (!name || !code || !credits || !semester || !department) {
    res.status(400);
    return next(new Error("All fields are required"));
  }

  const course = await Course.create({
    name,
    code,
    credits,
    semester,
    department,
    createdBy: req.user.id,
  });

  res.status(201).json({
    success: true,
    data: course,
  });
};

export const getCourses = async (req, res) => {
  const filter = {};

  if (req.query.department) {
    filter.department = req.query.department;
  }

  const courses = await Course.find(filter)
    .populate("department", "name code")
    .sort("semester");

  res.json({
    success: true,
    count: courses.length,
    data: courses,
  });
};
