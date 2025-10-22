import Product from "../models/Product.js";
export const addProduct = async (req, res) => {
  try {
    const { name, description, price, stock, imageUrl } = req.body;

    if (!req.user || req.user.role !== "seller") {
      return res.status(403).json({ message: "Only sellers can add products" });
    }

    const product = new Product({
      name,
      description,
      price,
      stock,
      imageUrl,
      seller: req.user._id,
    });

    await product.save();
    res.status(201).json(product);
  } catch (err) {
    console.error("Error adding product:", err);
    res.status(400).json({ message: err.message });
  }
};


export const getMyProducts = async (req, res) => {
  try {
    const products = await Product.find({ seller: req.user._id });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("seller", "name email");
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
