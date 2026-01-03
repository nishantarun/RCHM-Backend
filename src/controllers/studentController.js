import mongoose from "mongoose";
import Student from "../models/Student.js";
import User from "../models/User.js";
import Batch from "../models/Batch.js";

export const createStudent = async (req, res, next) => {
  const { userId, rollNumber, batch } = req.body;

  if (!userId || !rollNumber || !batch) {
    res.status(400);
    return next(new Error("All fields are required"));
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const user = await User.findById(userId).session(session);
    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    if (user.role !== "student") {
      res.status(400);
      throw new Error("User role is not student");
    }

    const existingStudent = await Student.findOne({ user: userId }).session(
      session
    );
    if (existingStudent) {
      res.status(409);
      throw new Error("Student already enrolled");
    }

    const existingBatch = await Batch.findById(batch).session(session);
    if (!existingBatch) {
      res.status(404);
      throw new Error("Batch not found");
    }

    if (!existingBatch.isActive) {
      res.status(400);
      throw new Error("Batch is not active");
    }

    const enrolledCount = await Student.countDocuments({ batch }).session(
      session
    );

    if (enrolledCount >= existingBatch.capacity) {
      res.status(400);
      throw new Error("Batch capacity reached");
    }

    const student = await Student.create(
      [
        {
          user: userId,
          rollNumber,
          batch,
        },
      ],
      { session }
    );

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      success: true,
      data: student[0],
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
};

export const getMyStudentProfile = async (req, res) => {
  const student = await Student.findOne({ user: req.user.id }).populate({
    path: "batch",
    populate: {
      path: "course",
      select: "name durationInMonths",
    },
  });

  if (!student) {
    res.status(404);
    return next(new Error("Student profile not found"));
  }

  res.json({
    success: true,
    data: student,
  });
};
