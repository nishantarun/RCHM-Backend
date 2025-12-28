import "./config/env.js";
import app from "./app.js";
import mongoose from "mongoose";

import chalk from "chalk";

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(chalk.green("MongoDB Connected"));

    app.listen(PORT, () => {
      console.log("Server Hosted: " + chalk.cyan(`http://localhost:${PORT}`));
    });
  } catch (error) {
    console.error(chalk.red("Failed to start server"), error);
    process.exit(1);
  }
};

startServer();
