import fs from "fs";
import path from "path";
import { Request } from "express";
import mime from "mime-types";

interface FileInfo {
  filename: string;
  originalname?: string;
  mimetype?: string;
  size?: number;
  url: string;
}

class FileService {
  private uploadsDir: string;

  constructor() {
    this.uploadsDir = path.join(__dirname, "../../uploads");

    // Create uploads directory if it doesn't exist
    if (!fs.existsSync(this.uploadsDir)) {
      fs.mkdirSync(this.uploadsDir, { recursive: true });
    }
  }

  /**
   * Check if a file exists
   * @param filename File name
   * @returns Boolean indicating if file exists
   */
  checkFileExists(filename: string): boolean {
    const filePath = path.join(this.uploadsDir, filename);
    return fs.existsSync(filePath);
  }

  /**
   * Get file stats
   * @param filename File name
   * @returns File stats or null if file doesn't exist
   */
  getFileStats(filename: string): fs.Stats | null {
    const filePath = path.join(this.uploadsDir, filename);

    try {
      return fs.statSync(filePath);
    } catch (error) {
      return null;
    }
  }

  /**
   * Get information about a file
   * @param req Express request
   * @param filename File name
   * @returns File information
   */
  getFileInfo(req: Request, filename: string): FileInfo {
    const filePath = path.join(this.uploadsDir, filename);
    const protocol = req.headers["x-forwarded-proto"] || req.protocol;
    let stats = null;

    try {
      stats = fs.statSync(filePath);
    } catch (error) {
      // File doesn't exist
    }

    return {
      filename,
      mimetype: mime.lookup(filename) || "application/octet-stream",
      size: stats?.size,
      url: `${protocol}://${req.get("host")}/f/${filename}`,
    };
  }

  /**
   * Get a list of all uploaded files
   * @returns Array of file information
   */
  getFileList(): {
    filename: string;
    size: number;
    uploadDate: Date;
    mimetype: string;
  }[] {
    try {
      const files = fs.readdirSync(this.uploadsDir);

      return files.map((filename) => {
        const filePath = path.join(this.uploadsDir, filename);
        const stats = fs.statSync(filePath);

        return {
          filename,
          size: stats.size,
          uploadDate: stats.mtime,
          mimetype: mime.lookup(filename) || "application/octet-stream",
        };
      });
    } catch (error) {
      return [];
    }
  }

  /**
   * Delete a file
   * @param filename File name
   * @returns Boolean indicating success
   */
  deleteFile(filename: string): boolean {
    const filePath = path.join(this.uploadsDir, filename);

    try {
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  }
}

export const fileService = new FileService();
