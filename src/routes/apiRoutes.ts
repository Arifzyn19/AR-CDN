import { Router } from "express";
import { uploadFile, uploadMultipleFiles } from "../config/multer";
import {
  apiUpload,
  apiListFiles,
  apiDeleteFile,
} from "../controllers/fileController";

const router = Router();

// API routes
router.post("/api/upload", uploadFile, apiUpload);
router.post("/api/upload/multiple", uploadMultipleFiles, apiUpload);
router.get("/api/files", apiListFiles);
router.delete("/api/file/:filename", apiDeleteFile);

export default router;
