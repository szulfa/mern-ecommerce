import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  addProduct,
  getMyProducts,
  getAllProducts,
} from "../controllers/productController.js";

const router = express.Router();

router.get("/", getAllProducts);
router.get("/mine", protect, getMyProducts);
router.post("/", protect, addProduct);

export default router;
