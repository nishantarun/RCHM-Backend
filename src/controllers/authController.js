import bcrypt from "bcrypt";
import User from "../models/User.js";

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  // Basic Validation
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Name, email and password are required");
  }

  // Existing User Check
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    res.status(409);
    throw new Error("User already exists");
  }

  // Password Hashing
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create User
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role: "student",
  });

  // Respond (Not sending password)
  res.status(201).json({
    success: true,
    message: "User registered successfully",
    data: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
};
