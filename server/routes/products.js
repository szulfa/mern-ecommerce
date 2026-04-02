  import express from "express";
  import Product from "../models/Product.js";

  const router = express.Router();

  // ➤ ADD PRODUCT
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
      console.log(err);
      res.status(500).json({ error: err.message });
    }
  });

  // ➤ GET ALL PRODUCTS
  router.get("/", async (req, res) => {
    try {
      const { seller } = req.query;

      let query = {};

      if (seller) {
        query.seller = seller;
      }

      const products = await Product.find(query);

      res.json(products);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  // ✅ FIX: GET SINGLE PRODUCT
  router.get("/:id", async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      res.json(product);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err.message });
    }
  });
  router.delete("/:id", async (req, res) => {
    try {
      const deletedProduct = await Product.findByIdAndDelete(req.params.id);

      if (!deletedProduct) {
        return res.status(404).json({ message: "Product not found" });
      }

      res.json({ message: "Product deleted successfully" });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err.message });
    }
  });

  export default router;