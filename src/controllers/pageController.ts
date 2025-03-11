import { Request, Response } from "express";
import path from "path";
import fs from "fs";
import { fileService } from "../services/fileService";

/**
 * Render home page
 */
export const getHome = (req: Request, res: Response): void => {
  res.render("index", {
    title: "Home | AR CDN",
    activeNav: "home",
  });
};

/**
 * Render about page
 */
export const getAbout = (req: Request, res: Response): void => {
  res.render("about", {
    title: "About | AR CDN",
    activeNav: "about",
  });
};

/**
 * Render contact page
 */
export const getContact = (req: Request, res: Response): void => {
  res.render("contact", {
    title: "Contact | AR CDN",
    activeNav: "contact",
  });
};

/**
 * Render documentation page
 */
export const getDocs = (req: Request, res: Response): void => {
  res.render("docs", {
    title: "Docs | AR CDN",
    activeNav: "docs",
    apiBaseUrl: `${req.protocol}://${req.get("host")}`,
  });
};

/**
 * Render file result page
 */
export const getFileResult = (req: Request, res: Response): void => {
  const { filename } = req.params;

  // Check if file exists
  const fileExists = fileService.checkFileExists(filename);

  if (fileExists) {
    // Get file stats
    const fileStats = fileService.getFileStats(filename);
    const fileInfo = fileService.getFileInfo(req, filename);

    res.render("result", {
      title: "File Result | AR CDN",
      fileUrl: fileInfo.url,
      filename: fileInfo.filename,
      originalFilename: fileInfo.originalname || filename,
      fileSize: fileStats?.size || 0,
      uploadDate: fileStats?.mtime || new Date(),
      mimetype: fileInfo.mimetype,
      activeNav: "",
    });
  } else {
    res.status(404).render("error", {
      title: "404 - File Not Found | AR CDN",
      message: "The requested file could not be found.",
      statusCode: 404,
    });
  }
};
