import fs from "fs";
import path from "path";
import { Request } from "express";
import { FileMetadata } from "../types/file";

export class FileHelper {
  /**
   * Generate a URL for a file
   */
  static getFileUrl(req: Request, filename: string): string {
    const protocol = req.headers["x-forwarded-proto"] || req.protocol;
    return `${protocol}://${req.get("host")}/f/${filename}`;
  }

  /**
   * Check if a file is an image
   */
  static isImage(mimetype: string): boolean {
    return mimetype.startsWith("image/");
  }

  /**
   * Check if a file is a document
   */
  static isDocument(mimetype: string): boolean {
    const documentTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "text/plain",
      "text/csv",
    ];
    return documentTypes.includes(mimetype);
  }

  /**
   * Format file size to human readable format
   */
  static formatFileSize(bytes: number): string {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1048576) return (bytes / 1024).toFixed(2) + " KB";
    if (bytes < 1073741824) return (bytes / 1048576).toFixed(2) + " MB";
    return (bytes / 1073741824).toFixed(2) + " GB";
  }

  /**
   * Create directory if it doesn't exist
   */
  static ensureDirectoryExists(directory: string): void {
    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory, { recursive: true });
    }
  }

  /**
   * Get extension from filename
   */
  static getExtension(filename: string): string {
    return path.extname(filename).toLowerCase();
  }

  /**
   * Get icon class based on file mimetype
   */
  static getFileIconClass(mimetype: string): string {
    if (mimetype.startsWith("image/")) return "fa-file-image";
    if (mimetype === "application/pdf") return "fa-file-pdf";
    if (mimetype.includes("word")) return "fa-file-word";
    if (mimetype.includes("excel") || mimetype.includes("spreadsheet"))
      return "fa-file-excel";
    if (mimetype.includes("zip") || mimetype.includes("compressed"))
      return "fa-file-archive";
    if (mimetype.includes("text/")) return "fa-file-alt";
    return "fa-file";
  }
}
