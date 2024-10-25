import express from "express";
import { uploadImages, getImages, deleteImage, rearrangeImages } from "../controllers/ImageController";
import { authMiddleware } from "../middleware/authMiddleware";
import multer from "multer"; // For file uploads

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/upload", authMiddleware, upload.array("images"), uploadImages);
router.get("/", authMiddleware, getImages);
router.delete("/:id", authMiddleware, deleteImage);
router.put("/rearrange", authMiddleware, rearrangeImages);

export default router;
