import express from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { protect } from "../middleware/authMiddleware.js";
import config from "../config.js";

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });
cloudinary.config({
  cloud_name: config.CLOUDINARY_CLOUD_NAME,
  api_key: config.CLOUDINARY_API_KEY,
  api_secret: config.CLOUDINARY_API_SECRET,
});

console.log("Cloudinary API Key:", config.CLOUDINARY_API_KEY);
router.post("/", protect, upload.single("image"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ msg: "No file uploaded" });

    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { resource_type: "image" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      stream.end(req.file.buffer);
    });

    res.json({ url: result.secure_url, public_id: result.public_id });
  } catch (err) {
    console.error("Upload route error:", err);
    res.status(500).json({ msg: "Upload failed", error: err.message });
  }
});

export default router;
