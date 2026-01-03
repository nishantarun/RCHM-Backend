import express from "express";
import authRoutes from "./routes/authRoutes.js";
import errorHandler from "./middlewares/errorMiddleware.js";
import adminRoutes from "./routes/adminRoutes.js";
import departmentRoutes from "./routes/departmentRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import batchRoutes from "./routes/batchRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("T_T");
});

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/departments", departmentRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/batches", batchRoutes);
app.use("/api/students", studentRoutes);

app.use(errorHandler);

export default app;
