import express from "express";
import path from "path";
import { configureServer } from "./config/server";
import pageRoutes from "./routes/pageRoutes";
import fileRoutes from "./routes/fileRoutes";
import apiRoutes from "./routes/apiRoutes";
import { errorHandler, notFoundHandler } from "./middlewares/errorHandler";
import logger from "./utils/logger";

// Initialize express app
const app = express();
const port: number = parseInt(process.env.PORT || "4321", 10);

// Configure server
configureServer(app);

// Register routes
app.use(pageRoutes);
app.use(fileRoutes);
app.use(apiRoutes);

// Handle 404 errors
app.use(notFoundHandler);

// Handle errors
app.use(errorHandler);

// Start server
app.listen(port, "0.0.0.0", () => {
  logger.info(`Server running at http://0.0.0.0:${port}`);
});

// Handle uncaught exceptions
process.on("uncaughtException", (error) => {
  logger.error("Uncaught Exception:", error);
  process.exit(1);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (reason, promise) => {
  logger.error("Unhandled Rejection at:", promise, "reason:", reason);
  process.exit(1);
});
