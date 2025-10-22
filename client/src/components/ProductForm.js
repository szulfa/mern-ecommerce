import React, { useState } from "react";
import API from "../services/api";

export default function ProductForm({ onProductAdded }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    image: null,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      console.log("Uploading image...");
      const imgData = new FormData();
      imgData.append("image", formData.image);

      const uploadRes = await API.post("/uploads", imgData);
      console.log("Upload response:", uploadRes.data);

      const productData = {
        name: formData.name,
        description: formData.description,
        price: formData.price,
        stock: formData.stock,
        imageUrl: uploadRes.data.url,
      };

      console.log("Sending product:", productData);

      const res = await API.post("/products", productData);
      console.log("Product added:", res.data);

      //alert("Product added successfully!");
      setFormData({ name: "", description: "", price: "", stock: "", image: null });
      if (onProductAdded) onProductAdded();
    } catch (err) {
      console.error("Add product error:", err);
      alert("Failed to add product. Please check if you are logged in as a seller.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <h3>Add New Product</h3>

      <input
        type="text"
        name="name"
        placeholder="Product Name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <textarea
        name="description"
        placeholder="Product Description"
        value={formData.description}
        onChange={handleChange}
        required
      ></textarea>
      <input
        type="number"
        name="price"
        placeholder="Price"
        value={formData.price}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="stock"
        placeholder="Stock Quantity"
        value={formData.stock}
        onChange={handleChange}
        required
      />
      <input
        type="file"
        name="image"
        accept="image/*"
        onChange={handleChange}
        required
      />

      <button type="submit" disabled={loading}>
        {loading ? "Uploading..." : "Add Product"}
      </button>
    </form>
  );
}
