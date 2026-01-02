import Department from "../models/Department.js";

export const createDepartment = async (req, res, next) => {
  const { name, code, description } = req.body;

  if (!name || !code) {
    res.status(400);
    return next(new Error("Name and code are required"));
  }

  const exists = await Department.findOne({
    $or: [{ name }, { code }],
  });

  if (exists) {
    res.status(409);
    return next(new Error("Department already exists"));
  }

  const department = await Department.create({
    name,
    code,
    description,
    createdBy: req.user.id,
  });

  res.status(201).json({
    success: true,
    data: department,
  });
};

export const getDepartments = async (req, res) => {
  const departments = await Department.find().sort("name");

  res.json({
    success: true,
    count: departments.length,
    data: departments,
  });
};
