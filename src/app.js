import express from "express";
import errorHandler from "./middleware/errorMiddleware.js";
const app = express();

import authRoutes from "./routes/authRoutes.js";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("T_T");
});

app.use("/api/auth",authRoutes);

app.use(errorHandler);

export default app;
