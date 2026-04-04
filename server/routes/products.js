import express from "express";
import Product from "../models/Product.js";
import mongoose from "mongoose";

const router = express.Router();

// ➤ ADD PRODUCT (NO CHANGE)
router.post("/", async (req, res) => {
  try {
    const {
      name,
      price,
      stock,
      description,
      image,
      category,
      seller,
    } = req.body;

    const product = new Product({
      name,
      price,
      stock,
      description,
      image,
      category,
      seller,
    });

    await product.save();

    res.status(201).json({
      message: "Product saved successfully",
      product,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ✅ FIXED: GET PRODUCTS (ONLY ONE ROUTE)
router.get("/", async (req, res) => {
  try {
    const { seller } = req.query;

    let query = {};

    // 🔥 FIX: prevent undefined + invalid ObjectId crash
    if (seller && seller !== "undefined") {
      if (mongoose.Types.ObjectId.isValid(seller)) {
        query.seller = seller;
      } else {
        // if invalid seller, return empty instead of ALL products
        return res.json([]);
      }
    }

    const products = await Product.find(query);

    console.log("FILTER:", query);
    console.log("RESULT COUNT:", products.length);

    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ➤ DELETE PRODUCT (NO CHANGE)
router.delete("/:id", async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;