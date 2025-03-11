import { Router } from "express";
import {
  getHome,
  getAbout,
  getContact,
  getDocs,
  getFileResult,
} from "../controllers/pageController";

const router = Router();

// Page routes
router.get("/", getHome);
router.get("/about", getAbout);
router.get("/contact", getContact);
router.get("/docs", getDocs);
router.get("/data/:filename", getFileResult);

export default router;
