import express from "express";
import path from "path";
import cors from "cors";
import morgan from "morgan";
import { engine } from "express-handlebars";
import Handlebars from "handlebars";

/**
 * Configure Express application with all necessary middlewares and settings
 * @param app Express application
 */
export const configureServer = (app: express.Application): void => {
  // Basic settings
  app.set("json spaces", 2);
  app.set("trust proxy", 1);

  // Configure body parsers
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));

  // Enable CORS and request logging
  app.use(cors());
  app.use(morgan("dev"));

  // Configure Handlebars
  const hbs = engine({
    extname: "jmk",
    layoutsDir: path.join(__dirname, "../../views/layouts"),
    partialsDir: path.join(__dirname, "../../views/partials"),
    helpers: {
      // Add year for copyright
      getCurrentYear: () => new Date().getFullYear(),
      // Convert bytes to human-readable format
      formatFileSize: (bytes: number) => {
        if (bytes < 1024) return bytes + " B";
        else if (bytes < 1048576) return (bytes / 1024).toFixed(2) + " KB";
        else if (bytes < 1073741824)
          return (bytes / 1048576).toFixed(2) + " MB";
        else return (bytes / 1073741824).toFixed(2) + " GB";
      },
      // Check if string includes substring
      includes: (str: string, substring: string) => str.includes(substring),
    },
  });

  // Register Handlebars helpers directly
  Handlebars.registerHelper(
    "includes",
    function (str: string, substring: string) {
      return str.includes(substring);
    },
  );

  // Configure view engine
  app.engine("jmk", hbs);
  app.set("view engine", "jmk");
  app.set("views", path.join(__dirname, "../../views"));

  // Static files
  app.use("/f", express.static(path.join(__dirname, "../../uploads")));
  app.use(express.static(path.join(__dirname, "../../public")));
  app.use(express.static(path.join(__dirname, "../../node_modules")));
};
