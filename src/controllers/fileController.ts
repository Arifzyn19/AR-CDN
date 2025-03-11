import { Request, Response } from "express";
import { fileService } from "../services/fileService";

/**
 * Handle file upload and redirect to result page
 */
export const handleUpload = (req: Request, res: Response): void => {
  if (
    !req.file &&
    (!req.files || (Array.isArray(req.files) && req.files.length === 0))
  ) {
    return res.status(400).render("error", {
      title: "Error | AR CDN",
      message: "No file uploaded",
      statusCode: 400,
    });
  }

  // Handle single file upload
  if (req.file) {
    res.redirect(`/data/${req.file.filename}`);
    return;
  }

  // Handle multiple files upload
  if (Array.isArray(req.files) && req.files.length > 0) {
    // Redirect to the first file for now
    // In a real app, you might want to create a page that shows all uploaded files
    res.redirect(`/data/${req.files[0].filename}`);
    return;
  }

  // Should never reach here, but just in case
  res.status(500).render("error", {
    title: "Error | AR CDN",
    message: "Something went wrong during upload",
    statusCode: 500,
  });
};

/**
 * List all files
 */
export const listFiles = (req: Request, res: Response): void => {
  try {
    const files = fileService.getFileList();

    res.render("files", {
      title: "Files | AR CDN",
      files,
      activeNav: "files",
    });
  } catch (error) {
    res.status(500).render("error", {
      title: "Error | AR CDN",
      message: "Failed to fetch file list",
      statusCode: 500,
    });
  }
};

/**
 * Delete a file
 */
export const deleteFile = (req: Request, res: Response): void => {
  const { filename } = req.params;

  const success = fileService.deleteFile(filename);

  if (success) {
    res.redirect("/list-files");
  } else {
    res.status(404).render("error", {
      title: "Error | AR CDN",
      message: "File not found or could not be deleted",
      statusCode: 404,
    });
  }
};

/**
 * API: Upload file
 */
export const apiUpload = (req: Request, res: Response): void => {
  if (
    !req.file &&
    (!req.files || (Array.isArray(req.files) && req.files.length === 0))
  ) {
    res.status(400).json({
      status: 400,
      message: "No file uploaded",
    });
  }

  const protocol = req.headers["x-forwarded-proto"] || req.protocol;

  // Handle single file upload
  if (req.file) {
    res.json({
      status: 200,
      creator: "Arifzyn.",
      data: {
        originalname: req.file.originalname,
        filename: req.file.filename,
        mimetype: req.file.mimetype,
        size: req.file.size,
        url: `${protocol}://${req.get("host")}/f/${req.file.filename}`,
      },
    });
    return;
  }

  // Handle multiple files upload
  if (Array.isArray(req.files) && req.files.length > 0) {
    const filesData = req.files.map((file) => ({
      originalname: file.originalname,
      filename: file.filename,
      mimetype: file.mimetype,
      size: file.size,
      url: `${protocol}://${req.get("host")}/f/${file.filename}`,
    }));

    res.json({
      status: 200,
      creator: "Arifzyn.",
      data: filesData,
    });
    return;
  }

  // Should never reach here, but just in case
  res.status(500).json({
    status: 500,
    message: "Something went wrong during upload",
  });
};

/**
 * API: List all files
 */
export const apiListFiles = (req: Request, res: Response): void => {
  try {
    const files = fileService.getFileList();
    const protocol = req.headers["x-forwarded-proto"] || req.protocol;

    // Add URL to each file
    const filesWithUrls = files.map((file) => ({
      ...file,
      url: `${protocol}://${req.get("host")}/f/${file.filename}`,
    }));

    res.status(200).json({
      status: 200,
      message: "File list fetched successfully",
      creator: "Arifzyn.",
      data: filesWithUrls,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Failed to fetch file list",
      error:
        error instanceof Error ? error.message : "An unknown error occurred",
    });
  }
};

/**
 * API: Delete a file
 */
export const apiDeleteFile = (req: Request, res: Response): void => {
  const { filename } = req.params;

  const success = fileService.deleteFile(filename);

  if (success) {
    res.status(200).json({
      status: 200,
      message: "File deleted successfully",
      creator: "Arifzyn.",
      data: { filename },
    });
  } else {
    res.status(404).json({
      status: 404,
      message: "File not found or could not be deleted",
      creator: "Arifzyn.",
    });
  }
};
