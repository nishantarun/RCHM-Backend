import express from "express";
import authRoutes from "./routes/authRoutes.js";
import errorHandler from "./middlewares/errorMiddleware.js";
import adminRoutes from "./routes/adminRoutes.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("T_T");
});

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);

app.use(errorHandler);

export default app;
