import { Router } from "express";
import { uploadFile, uploadMultipleFiles } from "../config/multer";
import {
  handleUpload,
  listFiles,
  deleteFile,
} from "../controllers/fileController";

const router = Router();

// File operations routes
router.post("/upload", uploadFile, handleUpload);
router.get("/list-files", listFiles);
router.delete("/file/:filename", deleteFile);
router.post("/upload/multiple", uploadMultipleFiles, handleUpload);

export default router;
