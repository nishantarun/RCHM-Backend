import Student from "../models/Student.js";
import User from "../models/User.js";
import Batch from "../models/Batch.js";

export const createStudent = async (req, res, next) => {
  const { userId, rollNumber, batch } = req.body;

  if (!userId || !rollNumber || !batch) {
    res.status(400);
    return next(new Error("All fields are required"));
  }

  const user = await User.findById(userId);
  if (!user) {
    res.status(404);
    return next(new Error("User not found"));
  }

  if (user.role !== "student") {
    res.status(400);
    return next(new Error("User role is not student"));
  }

  const existingBatch = await Batch.findById(batch);
  if (!existingBatch) {
    res.status(404);
    return next(new Error("Batch not found"));
  }

  const student = await Student.create({
    user: userId,
    rollNumber,
    batch,
  });

  res.status(201).json({
    success: true,
    data: student,
  });
};
