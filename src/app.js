import express from "express";
import errorHandler from "./middleware/errorMiddleware.js";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("T_T");
});

app.use(errorHandler);

export default app;
